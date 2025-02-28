"use client";
import Jobpostform from "@/app/components/Jobpostform";
import React, { useEffect, useState } from "react";

function page() {
  const [jobs, setJobs] = useState<
    Array<{
      _id?: string;
      experience?: string;
      salary?: string;
      jobdescription?: string;
      jobtitle?: string;
      link?: string;
      jobcategory?: string;
      lastdate?: any;
      companyname?: string;
      company_id?: string;
    }>
  >([]);

  const [appliedjobs, setAppliedjobs] = useState<
    Array<{
      _id?: string;
      experience?: string;
      salary?: string;
      jobdescription?: string;
      jobtitle?: string;
      link?: string;
      jobcategory?: string;
      lastdate?: any;
      companyname?: string;
      company_id?: string;
    }>
  >([]);
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
    _id?: string;
    password?: string;
    linkedin?: string;
  }>({});

  const handleFetch = async () => {
    try {
      const response = await fetch(`/api/postjob`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setJobs(result.Jobs);
      } else {
        alert("Jobs fetching Unsuccessfull");
      }
    } catch (error) {
      console.log(error);
      alert("Jobs fetching Unsuccessfull");
    }
  };

  const handleApplied = async (user_id: string) => {
    try {
      const response = await fetch(`/api/applyjob`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user_id: user_id }),
      });
      if (response.ok) {
        const result = await response.json();
        setAppliedjobs(result.jobDetails);
      } else {
        alert("Jobs fetching Unsuccessfull");
      }
    } catch (error) {
      console.log(error);
      alert("Jobs fetching Unsuccessfull");
    }
  };

  const handleApply = async (
    companyname: string,
    company_id: string,
    _id: string
  ) => {
    try {
      const response = await fetch(`/api/applyjob`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user_id: userData._id,
          username: userData.name,
          companyname: companyname,
          company_id: company_id,
          job_id: _id,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        alert("Successfully applied for the job");
        handleApplied(userData._id || "");
      } else {
        alert("Failed to apply for the job");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to apply for the job");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensures code runs only in the browser
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
        handleFetch();
        handleApplied(JSON.parse(storedUser)._id);
      }
    }
  }, []);

  return (
    <div className="w-full h-screen m-0 p-0 flex flex-col font-oxanium text-white bg-gradient-to-r from-[#2E073F] via-[#000B58] to-[#2E073F]">
      <div className="flex flex-row h-20 p-4 w-full justify-around items-center">
        <h1 className="text-4xl font-bold">{userData.name}</h1>
        <h1 className="flex flex-col">
          Email : <p>{userData.email}</p>
        </h1>
        <h1 className="flex flex-col">
          Linkedin : <p>{userData.linkedin}</p>
        </h1>
      </div>
      <div className="h-[0.05rem] w-full bg-white"></div>
      <h1 className="text-center text-3xl my-2">Recent Job Openings</h1>
      <div className="flex flex-col gap-2 overflow-y-scroll h-full mt-2">
        {jobs.map((job) => {
          return (
            <div
              className="flex w-[90%] h-24 bg-gray-900 mx-auto flex-row justify-center rounded-lg"
              key={job._id}
            >
              <div className="h-full w-full flex flex-row">
                <div className="flex flex-col h-full w-1/4 items-center justify-evenly">
                  <h1>{job.jobtitle}</h1>
                  <h1>{job.jobcategory}</h1>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline text-blue-500 w-fit overflow-x-hidden"
                  >
                    Registration Link
                  </a>
                </div>
                <div className="flex flex-col h-full w-1/2 items-center justify-evenly overflow-clip">
                  <h1>{job.jobdescription}</h1>
                  <h1>{job.companyname}</h1>
                </div>
                <div className="flex flex-col h-full w-1/4 items-center justify-evenly">
                  <h1>{job.experience}</h1>
                  <p>{job.salary}</p>
                  <p>
                    Last Date:{" "}
                    {new Date(job.lastdate).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <div
                className="h-full ml-auto text-xl pt-7 pr-4 hover:pr-2 transition-all duration-150 hover:bg-gray-800 cursor-pointer pl-3"
                onClick={() =>
                  handleApply(
                    job.companyname || "",
                    job.company_id || "",
                    job._id || ""
                  )
                }
              >
                Apply
              </div>
            </div>
          );
        })}
      </div>
      <h1 className="text-center text-3xl my-2">Jobs Applied By You</h1>
      <div className="flex flex-col gap-2 overflow-y-scroll h-full mt-2">
        {appliedjobs.map((job) => {
          return (
            <div
              className="flex w-[90%] h-24 bg-gray-900 mx-auto flex-row justify-center rounded-lg"
              key={job._id}
            >
              <div className="h-full w-full flex flex-row">
                <div className="flex flex-col h-full w-1/4 items-center justify-evenly">
                  <h1>{job.jobtitle}</h1>
                  <h1>{job.jobcategory}</h1>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline text-blue-500 w-fit overflow-x-hidden"
                  >
                    Registration Link
                  </a>
                </div>
                <div className="flex flex-col h-full w-1/2 items-center justify-evenly overflow-clip">
                  <h1>{job.jobdescription}</h1>
                  <h1>{job.companyname}</h1>
                </div>
                <div className="flex flex-col h-full w-1/4 items-center justify-evenly">
                  <h1>{job.experience}</h1>
                  <p>{job.salary}</p>
                  <p>
                    LastDate:{" "}
                    {new Date(job.lastdate).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
