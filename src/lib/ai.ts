import { generateText, streamText } from "ai";

// Uses AI Gateway when deployed on Vercel (OIDC auth auto-provisioned).
// Falls back to ANTHROPIC_API_KEY for local dev.
const MODEL_ID = "anthropic/claude-sonnet-4.6";

export async function generateAiContent(
  systemPrompt: string,
  userPrompt: string,
) {
  const { text, usage } = await generateText({
    model: MODEL_ID,
    system: systemPrompt,
    prompt: userPrompt,
  });

  return {
    text,
    tokensUsed: (usage?.promptTokens ?? 0) + (usage?.completionTokens ?? 0),
  };
}

export function streamAiContent(systemPrompt: string, userPrompt: string) {
  return streamText({
    model: MODEL_ID,
    system: systemPrompt,
    prompt: userPrompt,
  });
}
