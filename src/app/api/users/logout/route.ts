import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Success",
      success: true,
    });
    response.cookies.set("nexttoken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
