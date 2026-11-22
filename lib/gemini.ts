export const DEFAULT_GEMINI_MODEL =
  process.env.GEMINI_MODEL?.trim() || 'gemini-4-hydrogen';

export const GEMINI_INTERACTIONS_URL =
  'https://generativelanguage.googleapis.com/v1/interactions';

export const GEMINI_API_REVISION = '2026-05-20';

export type GeminiTextPart = {
  type: 'text';
  text: string;
};

export type GeminiStep = {
  type: 'user_input' | 'model_output';
  content: GeminiTextPart[];
};

export type GeminiThinkingLevel = 'low' | 'medium' | 'high';

export interface CreateGeminiInteractionOptions {
  model?: string;
  systemInstruction?: string;
  input: string | GeminiStep[];
  responseFormat?: Record<string, unknown>;
  thinkingLevel?: GeminiThinkingLevel;
  store?: boolean;
}

interface GeminiInteractionResponse {
  steps?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
}

let warnedVertexExpressKey = false;

/**
 * Returns the configured Google AI Studio Gemini API key, or null when missing
 * or when a Vertex AI Express Mode key (`AQ.`) is supplied.
 */
export function getGeminiApiKey(): string | null {
  const apiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ''
  ).trim();

  if (!apiKey) {
    return null;
  }

  if (apiKey.startsWith('AQ.')) {
    if (!warnedVertexExpressKey) {
      warnedVertexExpressKey = true;
      console.warn(
        'Configured GEMINI_API_KEY starts with "AQ.", which is a Vertex AI Express Mode key incompatible with generativelanguage.googleapis.com. Create a Google AI Studio key at https://aistudio.google.com/apikey.'
      );
    }
    return null;
  }

  return apiKey;
}

/**
 * Creates a stateless or single-turn interaction on the Gemini Interactions API
 * and returns the extracted model output text, or null when unconfigured/empty.
 */
export async function createGeminiInteraction(
  options: CreateGeminiInteractionOptions
): Promise<string | null> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return null;
  }

  const model = options.model || DEFAULT_GEMINI_MODEL;

  const body: Record<string, unknown> = {
    model,
    input: options.input,
    store: options.store ?? false,
    ...(options.systemInstruction
      ? { system_instruction: options.systemInstruction }
      : {}),
    ...(options.thinkingLevel
      ? { generation_config: { thinking_level: options.thinkingLevel } }
      : {}),
    ...(options.responseFormat
      ? { response_format: options.responseFormat }
      : {}),
  };

  const response = await fetch(GEMINI_INTERACTIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
      'Api-Revision': GEMINI_API_REVISION,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(
      `Gemini API error (${model}): ${response.status} - ${errorText}`
    );
  }

  const data = (await response.json()) as GeminiInteractionResponse;
  const outputText = (data.steps ?? [])
    .filter((step) => step.type === 'model_output')
    .flatMap((step) => step.content ?? [])
    .filter(
      (part): part is GeminiTextPart =>
        part?.type === 'text' && typeof part.text === 'string'
    )
    .map((part) => part.text)
    .join('')
    .trim();

  return outputText || null;
}
