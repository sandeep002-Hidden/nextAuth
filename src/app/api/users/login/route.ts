import connect from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(req: NextRequest) {
  try {
    console.log("From Login backend");
    const reqBody = await req.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: "User is not available", success: false });
    }
    const dbPass = user.password;
    const passwordValidity = await bcryptjs.compare(password, dbPass);
    if (passwordValidity) {
      const tokenData = {
        id: user._id,
        user: user.username,
      };
      const token = jwt.sign(tokenData, process.env.TOKENSECRETE!, {
        expiresIn: "1d",
      });
      const response = NextResponse.json({
        message: "Login Successful",
        success: true,
      });
      response.cookies.set("nexttoken", token, {
        httpOnly: true,
      });
      return response;
    } else {
      return NextResponse.json({ message: "Invalid Password", success: false });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
