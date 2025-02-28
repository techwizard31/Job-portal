import { NextResponse } from "next/server";
import { User,createToken,connectToDatabase } from "../../db";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await connectToDatabase(); // Connect to the database
  
    try {
      const { name,email,password,linkedin } = await request.json();
  
      // Check if the user exists
      const exists = await User.findOne({ email: email });
      if (exists) {
        return NextResponse.json({ error: "User already exists !" }, { status: 400 });
      }
  
      // If the user doesn't exist, create a new one
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ name: name, email:email,password: hashedPassword,linkedin:linkedin });
      const token = createToken(user._id);
  
      return NextResponse.json({ user, token }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }