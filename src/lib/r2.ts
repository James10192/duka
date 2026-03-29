import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const globalForR2 = globalThis as unknown as {
  r2: S3Client | undefined;
};

function createR2Client() {
  return new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
    },
  });
}

export const r2 = globalForR2.r2 ?? createR2Client();

if (process.env.NODE_ENV !== "production") {
  globalForR2.r2 = r2;
}

export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 300,
) {
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(r2, command, { expiresIn });
}

export function getR2PublicUrl(key: string) {
  return `${process.env.CLOUDFLARE_R2_ENDPOINT}/${process.env.CLOUDFLARE_R2_BUCKET}/${key}`;
}
