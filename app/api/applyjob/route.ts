import { NextResponse } from "next/server";
import { connectToDatabase,Application,Job } from "../db";

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

  export async function PATCH(request: Request) {
    await connectToDatabase(); // Connect to the database
    const { job_id } = await request.json();
    try {
      
      const Jobs = await Application.find({job_id:job_id});
  
      return NextResponse.json({ Jobs }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }

  export async function DELETE(request: Request) {
    await connectToDatabase(); // Connect to the database
    const { user_id } = await request.json();
    try {
      
      const Jobs = await Application.find({user_id:user_id});
  
      const jobDetailsArray: any[] = [];

    // Fetch job details and store them in the array
    await Promise.all(
      Jobs.map(async (job) => {
        const jobDetail = await Job.findById(job.job_id);
        if (jobDetail) {
          jobDetailsArray.push(jobDetail);
        }
      })
    );

    return NextResponse.json({ jobDetails: jobDetailsArray }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }