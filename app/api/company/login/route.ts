import { NextResponse } from "next/server";
import { Company,createToken,connectToDatabase } from "../../db";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await connectToDatabase(); // Connect to the database
  
    try {
      const { email,password } = await request.json();
  
      // Check if the user exists
      const exists = await Company.findOne({ email: email });
      if (exists) {
        const hashedPassword = await bcrypt.hash(password, 10);
        if(exists.password = hashedPassword){
            const token = createToken(exists._id);
            return NextResponse.json({ exists, token }, { status: 200 });  
        }else{
            return NextResponse.json({ error: "Password entered is wrong !" }, { status: 400 }); 
        }
      }else{
        return NextResponse.json({ error: "Company is not registered yet !" }, { status: 400 });
      }
  
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }