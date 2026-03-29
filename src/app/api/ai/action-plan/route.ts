import { NextRequest, NextResponse } from "next/server";
import { generateAiContent } from "@/lib/ai";
import { AI_SYSTEM_PROMPT, buildActionPlanPrompt } from "@/lib/ai-prompts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sector, city, products, monthlyRevenue } = body;

    const prompt = buildActionPlanPrompt({
      sector,
      city,
      products,
      monthlyRevenue,
    });

    const { text, tokensUsed } = await generateAiContent(
      AI_SYSTEM_PROMPT,
      prompt,
    );

    const result = JSON.parse(text);

    return NextResponse.json({ result, tokensUsed });
  } catch (error) {
    console.error("AI generation failed:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération" },
      { status: 500 },
    );
  }
}
