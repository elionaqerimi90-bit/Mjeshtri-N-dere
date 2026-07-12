import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Duhesh me qenë i kyçur" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload || payload.role !== "MJESHTER") {
      return NextResponse.json(
        { error: "Vetëm mjeshtrit mund të krijojnë profil" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { category, basePrice, description, radiusKm, avatarUrl } = body;

    if (!category || !basePrice) {
      return NextResponse.json(
        { error: "Kategoria dhe çmimi bazë janë të detyrueshme" },
        { status: 400 }
      );
    }

    const existingProfile = await prisma.mjeshtriProfile.findUnique({
      where: { userId: payload.userId },
    });

    if (existingProfile) {
      return NextResponse.json(
        { error: "Profili tashmë ekziston" },
        { status: 409 }
      );
    }

    const profile = await prisma.mjeshtriProfile.create({
      data: {
        userId: payload.userId,
        category,
        basePrice: parseFloat(basePrice),
        description: description || null,
        radiusKm: radiusKm ? parseInt(radiusKm) : 15,
        avatarUrl: avatarUrl || null,
      },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Profile creation error:", error);
    return NextResponse.json(
      { error: "Diçka shkoi keq, provo përsëri" },
      { status: 500 }
    );
  }
}