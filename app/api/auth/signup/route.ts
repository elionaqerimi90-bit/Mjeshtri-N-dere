import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, phone, role } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: "Ju lutem plotësoni krejt fushat e kërkuara" },
        { status: 400 }
      );
    }

    if (role !== "CLIENT" && role !== "MJESHTER") {
      return NextResponse.json(
        { error: "Rol i pavlefshëm" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Ky email osht tashmë i regjistruar" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone: phone || null,
        role,
      },
    });

    const token = await createToken({ userId: user.id, role: user.role });

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Diçka shkoi keq, provo përsëri" },
      { status: 500 }
    );
  }
}
  