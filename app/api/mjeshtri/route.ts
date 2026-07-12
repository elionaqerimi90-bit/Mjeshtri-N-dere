import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const profiles = await prisma.mjeshtriProfile.findMany({
    where: category ? { category: category as never } : undefined,
    include: {
      user: {
        select: { name: true },
      },
    },
    orderBy: { rating: "desc" },
  });

  return NextResponse.json({ profiles });
}
