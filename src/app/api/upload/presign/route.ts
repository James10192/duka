import { NextRequest, NextResponse } from "next/server";
import { getPresignedUploadUrl } from "@/lib/r2";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const { fileName, contentType, fileSize } = await request.json();

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé" },
        { status: 400 },
      );
    }

    if (fileSize > MAX_SIZE) {
      return NextResponse.json(
        { error: "Fichier trop volumineux (max 10 Mo)" },
        { status: 400 },
      );
    }

    const key = `uploads/${Date.now()}-${fileName}`;
    const url = await getPresignedUploadUrl(key, contentType);

    return NextResponse.json({ url, key });
  } catch (error) {
    console.error("Presign failed:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération de l'URL" },
      { status: 500 },
    );
  }
}
