import { NextResponse } from "next/server";
import { connectToDatabase,Application } from "../db";

export async function POST(request: Request) {
    await connectToDatabase(); // Connect to the database
  
    try {
      const { companyname,company_id,username,user_id,job_id } = await request.json();

      const Apply = await Application.create({ companyname:companyname,company_id:company_id,username:username,user_id:user_id,job_id:job_id });
      
      return NextResponse.json({ Apply }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }