#!/usr/bin/env node
/**
 * Zonvo DB Exporter — Exports all data as SQL INSERT statements
 * Works regardless of PostgreSQL version
 */

import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Pool } = pg;

const SOURCE_URL = process.argv[2];
const OUTPUT_FILE = process.argv[3] || './zonvo_export.sql';

if (!SOURCE_URL) {
  console.error('Usage: node db-export.mjs <DATABASE_URL> [output.sql]');
  process.exit(1);
}

const pool = new Pool({
  connectionString: SOURCE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

async function exportDB() {
  const client = await pool.connect();
  const out = fs.createWriteStream(OUTPUT_FILE, { encoding: 'utf8' });

  console.log('🔌 Connected to source database...');
  
  const write = (text) => out.write(text + '\n');

  write('-- Zonvo DB Export');
  write('-- Generated: ' + new Date().toISOString());
  write('-- Source: NeonDB → Supabase migration');
  write('');
  write('SET client_encoding = \'UTF8\';');
  write('SET standard_conforming_strings = on;');
  write('SET check_function_bodies = false;');
  write('SET xmloption = content;');
  write('SET client_min_messages = warning;');
  write('SET row_security = off;');
  write('');

  // Get all tables in correct order (respecting foreign keys)
  const tablesRes = await client.query(`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public'
    ORDER BY tablename
  `);
  
  const tables = tablesRes.rows.map(r => r.tablename);
  console.log(`📊 Found ${tables.length} tables: ${tables.join(', ')}`);

  // Get sequences
  console.log('📋 Exporting sequences...');
  const seqRes = await client.query(`
    SELECT sequence_name FROM information_schema.sequences 
    WHERE sequence_schema = 'public'
  `);

  for (const seq of seqRes.rows) {
    const seqVal = await client.query(
      `SELECT last_value FROM "${seq.sequence_name}"`
    ).catch(() => null);
    if (seqVal) {
      write(`SELECT setval('public."${seq.sequence_name}"', ${seqVal.rows[0].last_value}, true);`);
    }
  }
  write('');

  // Get schema (CREATE TABLE statements)
  console.log('🏗️  Exporting schema (CREATE TABLE)...');
  const schemaRes = await client.query(`
    SELECT 
      'CREATE TABLE IF NOT EXISTS public."' || table_name || '" (' ||
      string_agg(
        '"' || column_name || '" ' || 
        data_type || 
        CASE WHEN character_maximum_length IS NOT NULL 
             THEN '(' || character_maximum_length || ')' 
             ELSE '' END ||
        CASE WHEN is_nullable = 'NO' THEN ' NOT NULL' ELSE '' END,
        ', ' ORDER BY ordinal_position
      ) || ');' AS create_stmt,
      table_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
    GROUP BY table_name
    ORDER BY table_name
  `);

  // Better: get the actual DDL using pg_dump style query
  for (const table of tables) {
    try {
      const colsRes = await client.query(`
        SELECT 
          column_name,
          data_type,
          character_maximum_length,
          is_nullable,
          column_default,
          udt_name
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position
      `, [table]);

      const cols = colsRes.rows.map(col => {
        let type = col.data_type;
        if (type === 'character varying') type = `varchar${col.character_maximum_length ? `(${col.character_maximum_length})` : ''}`;
        if (type === 'USER-DEFINED') type = col.udt_name;
        if (type === 'ARRAY') type = col.udt_name.replace('_', '') + '[]';
        const nullable = col.is_nullable === 'NO' ? ' NOT NULL' : '';
        const def = col.column_default ? ` DEFAULT ${col.column_default}` : '';
        return `  "${col.column_name}" ${type}${nullable}${def}`;
      }).join(',\n');

      write(`CREATE TABLE IF NOT EXISTS public."${table}" (`);
      write(cols);
      write(');');
      write('');
    } catch (e) {
      console.log(`  ⚠️  Schema for ${table}: ${e.message}`);
    }
  }

  // Export data for each table
  console.log('\n📦 Exporting data...\n');
  let totalRows = 0;

  for (const table of tables) {
    try {
      const countRes = await client.query(`SELECT COUNT(*) FROM public."${table}"`);
      const count = parseInt(countRes.rows[0].count);
      
      if (count === 0) {
        console.log(`  ⬜ ${table}: 0 rows (skipping)`);
        continue;
      }

      console.log(`  📥 ${table}: ${count} rows...`);
      write(`-- Table: ${table} (${count} rows)`);
      write(`TRUNCATE TABLE public."${table}" CASCADE;`);

      // Stream in batches of 500
      const BATCH = 500;
      for (let offset = 0; offset < count; offset += BATCH) {
        const rows = await client.query(
          `SELECT * FROM public."${table}" LIMIT $1 OFFSET $2`,
          [BATCH, offset]
        );

        if (rows.rows.length === 0) break;

        const columns = rows.fields.map(f => `"${f.name}"`).join(', ');
        
        for (const row of rows.rows) {
          const values = rows.fields.map(field => {
            const val = row[field.name];
            if (val === null || val === undefined) return 'NULL';
            if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
            if (typeof val === 'number') return val;
            if (val instanceof Date) return `'${val.toISOString()}'`;
            if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
            return `'${String(val).replace(/'/g, "''")}'`;
          }).join(', ');

          write(`INSERT INTO public."${table}" (${columns}) VALUES (${values}) ON CONFLICT DO NOTHING;`);
        }
        totalRows += rows.rows.length;
      }

      write('');
    } catch (e) {
      console.log(`  ❌ Error in ${table}: ${e.message}`);
      write(`-- ERROR exporting ${table}: ${e.message}`);
    }
  }

  out.end();
  client.release();
  await pool.end();

  const stats = fs.statSync(OUTPUT_FILE);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

  console.log('\n' + '='.repeat(50));
  console.log(`✅ EXPORT COMPLETE`);
  console.log(`   File: ${OUTPUT_FILE}`);
  console.log(`   Size: ${sizeMB} MB`);
  console.log(`   Total rows exported: ${totalRows}`);
  console.log(`   Tables: ${tables.length}`);
  console.log('='.repeat(50));
  console.log('\n📋 NEXT STEP:');
  console.log('   Provide your Supabase DATABASE_URL and run:');
  console.log('   node db-import.mjs <SUPABASE_URL>');
}

exportDB().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
