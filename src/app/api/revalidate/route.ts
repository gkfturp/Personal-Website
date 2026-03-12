import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: any = null;
  try {
    body = await request.json();
  } catch {
    // ignore
  }

  const docType = body?._type;
  const slug = body?.slug?.current;

  revalidatePath("/");
  if (docType === "project" && slug) {
    revalidatePath(`/work/${slug}`);
  }

  return NextResponse.json({ revalidated: true });
}
