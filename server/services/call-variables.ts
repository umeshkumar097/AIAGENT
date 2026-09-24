/**
 * Per-call variables for API-triggered and API-scheduled calls (`dynamicVariables` on POST /v1/calls,
 * `variables` on scheduled callbacks): validation plus `{{key}}` / `{key}` substitution into the agent's
 * system prompt and first message. Pure — no DB, no logging (values are caller data and are never logged).
 */

export const VARIABLE_KEY_RE = /^[a-zA-Z0-9_]{1,40}$/;
export const MAX_VARIABLES = 20;
export const MAX_VARIABLE_VALUE_LENGTH = 300;

export type CallVariables = Record<string, string>;

/**
 * Validates a variables object: ≤ 20 keys matching VARIABLE_KEY_RE, string/number/boolean values ≤ 300 chars.
 * Values are flattened to a single line (they are echoed into the prompt line by line).
 */
export function parseCallVariables(input: unknown): { variables: CallVariables } | { error: string } {
  if (input == null) return { variables: {} };
  if (typeof input !== 'object' || Array.isArray(input)) return { error: 'variables must be an object of key → value' };
  const entries = Object.entries(input as Record<string, unknown>);
  if (entries.length > MAX_VARIABLES) return { error: `At most ${MAX_VARIABLES} variables are allowed` };
  const variables: CallVariables = {};
  for (const [key, raw] of entries) {
    if (!VARIABLE_KEY_RE.test(key)) return { error: `Variable name "${key}" must match ${VARIABLE_KEY_RE.source}` };
    if (raw == null) continue;
    if (typeof raw !== 'string' && typeof raw !== 'number' && typeof raw !== 'boolean') {
      return { error: `Variable "${key}" must be a string, number or boolean` };
    }
    const value = String(raw).replace(/[\r\n\t]+/g, ' ').trim();
    if (value.length > MAX_VARIABLE_VALUE_LENGTH) return { error: `Variable "${key}" must be at most ${MAX_VARIABLE_VALUE_LENGTH} characters` };
    variables[key] = value;
  }
  return { variables };
}

/** Replaces `{{key}}` and `{key}` (whitespace inside the braces tolerated) with the variable's value. */
export function substituteVariables(text: string, variables: CallVariables): string {
  if (!text || !variables || Object.keys(variables).length === 0) return text;
  return text.replace(/\{\{\s*([a-zA-Z0-9_]{1,40})\s*\}\}|\{\s*([a-zA-Z0-9_]{1,40})\s*\}/g, (match, doubleKey?: string, singleKey?: string) => {
    const key = doubleKey ?? singleKey ?? '';
    return Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : match;
  });
}

/** "Details for this call" block appended to the prompt so the agent can use variables the prompt never mentions. */
export function variablesDetailsBlock(variables: CallVariables): string {
  const lines = Object.entries(variables).filter(([, v]) => v !== '').map(([k, v]) => `- ${k}: ${v}`);
  return lines.length ? `\n\nDetails for this call:\n${lines.join('\n')}` : '';
}

/** Substitutes into both texts and appends the details block to the system prompt. */
export function applyCallVariables(
  systemPrompt: string,
  firstMessage: string | null | undefined,
  variables: CallVariables | null | undefined,
): { systemPrompt: string; firstMessage: string | undefined } {
  const vars = variables && Object.keys(variables).length ? variables : null;
  if (!vars) return { systemPrompt, firstMessage: firstMessage || undefined };
  return {
    systemPrompt: `${substituteVariables(systemPrompt, vars)}${variablesDetailsBlock(vars)}`,
    firstMessage: firstMessage ? substituteVariables(firstMessage, vars) : undefined,
  };
}
