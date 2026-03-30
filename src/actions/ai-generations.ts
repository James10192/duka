"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth-session";
import type { AiType } from "@/generated/prisma/client";

export async function createAiGeneration(data: {
  orgId: string;
  type: AiType;
  prompt: string;
  result: string;
  model?: string;
  tokensUsed?: number;
}) {
  await getUserId();

  const generation = await prisma.aiGeneration.create({
    data: {
      orgId: data.orgId,
      type: data.type,
      prompt: data.prompt,
      result: data.result,
      model: data.model ?? "claude-sonnet-4-6",
      tokensUsed: data.tokensUsed ?? 0,
    },
  });

  return generation;
}

export async function getAiGenerations(orgId: string, type?: AiType) {
  await getUserId();

  const where: Record<string, unknown> = { orgId };
  if (type) where.type = type;

  const generations = await prisma.aiGeneration.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return generations;
}

export async function getAiGeneration(id: string) {
  await getUserId();

  const generation = await prisma.aiGeneration.findUnique({
    where: { id },
  });

  if (!generation) throw new Error("AI generation not found");
  return generation;
}
