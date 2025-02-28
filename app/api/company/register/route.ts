import { NextResponse } from "next/server";
import { Company,createToken,connectToDatabase } from "../../db";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await connectToDatabase(); // Connect to the database
  
    try {
      const { name,phonenumber,email,password,info } = await request.json();
  
      // Check if the user exists
      const exists = await Company.findOne({ email: email });
      if (exists) {
        return NextResponse.json({ error: "Company is already registered" }, { status: 400 });
      }
  
      // If the user doesn't exist, create a new one
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt);

      const comapany = await Company.create({ name: name, email:email,password: hashedPassword,phonenumber:phonenumber,info:info });
      const token = createToken(comapany._id);
  
      return NextResponse.json({ comapany, token }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }