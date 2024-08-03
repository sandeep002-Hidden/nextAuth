import connect from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  let response;
  const reqBody = await req.json();
  const { email, password } = reqBody;
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  try {
    await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } }
    ).then((updateRes) => {
      response = NextResponse.json({
        message: "Password Changed Success fully",
        success: true,
      });
    });
  } catch (error: any) {
    console.log(error.message);
    response = NextResponse.json({
      message: "Error occur while changing password",
      success: false,
    });
  } finally {
    return response;
  }
}
