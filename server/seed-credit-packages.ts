/**
 * ============================================================
 * © 2025 Zonvo AI — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://zonvo.tech
 * Contact: cs@zonvo.tech
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */
import { db } from "./db";
import { creditPackages } from "@shared/schema";

// Prices are INR excl. GST (Cashfree is the only gateway; GST is added at checkout).
// 1 credit = 1 call minute. Vendor cost ≈ ₹2.5/min, so the ladder runs ₹5.49 → ₹4.00 per minute.
// Mirrors migrations/0012_pricing_sept_2026.sql (used only on fresh installs).
const CREDIT_PACKAGES_SEED_DATA = [
  {
    name: "100 minutes",
    description: "Top-up for small campaigns — ₹5.49 per minute",
    credits: 100,
    price: "549.00",
    isActive: true,
  },
  {
    name: "500 minutes",
    description: "Most popular top-up — ₹5.00 per minute",
    credits: 500,
    price: "2499.00",
    isActive: true,
  },
  {
    name: "1,000 minutes",
    description: "For regular campaigns — ₹4.50 per minute (save 10%)",
    credits: 1000,
    price: "4499.00",
    isActive: true,
  },
  {
    name: "2,500 minutes",
    description: "For busy teams — ₹4.20 per minute (save 16%)",
    credits: 2500,
    price: "10499.00",
    isActive: true,
  },
  {
    name: "5,000 minutes",
    description: "High volume — ₹4.00 per minute (save 20%)",
    credits: 5000,
    price: "19999.00",
    isActive: true,
  },
];

async function seedCreditPackages() {
  try {
    console.log("🌱 Starting Credit Packages seed...");

    const existingPackages = await db.select().from(creditPackages);

    if (existingPackages.length > 0) {
      console.log(`⚠️  Found ${existingPackages.length} existing credit packages. Skipping seed to prevent duplicates.`);
      console.log("   To re-seed, first delete all credit packages from the database.");
      return;
    }

    console.log(`📦 Inserting ${CREDIT_PACKAGES_SEED_DATA.length} credit packages...`);
    await db.insert(creditPackages).values(CREDIT_PACKAGES_SEED_DATA);

    console.log("✅ Successfully seeded Credit Packages!");
    CREDIT_PACKAGES_SEED_DATA.forEach(pkg => {
      const pricePerCredit = (parseFloat(pkg.price) / pkg.credits).toFixed(2);
      console.log(`   - ${pkg.name}: ${pkg.credits} credits @ ₹${pkg.price} (₹${pricePerCredit}/credit)`);
    });

  } catch (error) {
    console.error("❌ Error seeding Credit Packages:", error);
    throw error;
  }
}

export { seedCreditPackages, CREDIT_PACKAGES_SEED_DATA };
