import { NextResponse } from "next/server";
import { connectToDatabase,Job } from "../db";

export async function POST(request: Request) {
    await connectToDatabase(); // Connect to the database
  
    try {
      const { companyname,company_id,jobcategory,jobdescription,jobtitle,experience,salary,link,lastdate } = await request.json();

      const Jobs = await Job.create({ companyname:companyname,company_id:company_id,jobcategory:jobcategory,jobdescription:jobdescription,jobtitle:jobtitle,experience:experience,salary:salary,link:link,lastdate:lastdate });
      
  
      return NextResponse.json({ Jobs }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }