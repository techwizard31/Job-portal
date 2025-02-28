"use client";
import Jobpostform from "@/app/components/Jobpostform";
import React, { useEffect, useState } from "react";

function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Array<{
    _id?:string,
    experience?: string;
    salary?: string;
    jobdescription?: string;
    jobtitle?: string;
    link?: string;
    jobcategory?: string;
    lastdate?: any;
    companyname?: string;
    company_id?: string;
  }>>([]);  
  const [companyData, setCompanyData] = useState<{
    phonenumber?: string;
    name?: string;
    email?: string;
    _id?: string;
    info?: string;
    password?: string;
  }>({});

  const handleFetch = async (_id: string) => {
    try {
      const response = await fetch(`/api/postjob`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ company_id: _id }),
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensures code runs only in the browser
      const storedCompany = sessionStorage.getItem("company");
      if (storedCompany) {
        setCompanyData(JSON.parse(storedCompany));
        handleFetch(JSON.parse(storedCompany)._id)
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensures code runs only in the browser
      const storedCompany = sessionStorage.getItem("company");
      if (storedCompany) {
        setCompanyData(JSON.parse(storedCompany));
        handleFetch(JSON.parse(storedCompany)._id)
      }
    }
  }, [isModalOpen]);

  return (
    <div className="w-full h-screen m-0 p-0 flex flex-col font-oxanium text-white bg-black">
      <div className="flex flex-row h-20 w-full justify-around items-center">
        <h1 className="w-30">{`Contact No.: ${companyData.phonenumber}`}</h1>
        <h1 className="text-4xl font-bold">{companyData.name}</h1>
        <h1 className="w-20">
          Email : <p>{companyData.email}</p>
        </h1>
      </div>
      <div className="h-[0.05rem] w-full bg-white"></div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 w-20 text-base h-6 hover:text-black hover:bg-white transition-all duration-150 scale-105 cursor-pointer mx-auto"
      >
        Post a job
      </button>
      {isModalOpen && <Jobpostform closeModal={() => setIsModalOpen(false)} />}
      <div className="flex flex-col gap-2 overflow-y-scroll h-full mt-2">
        {jobs.map((job) => {
          return (
            <div className="flex w-[90%] h-24 bg-gray-900 mx-auto flex-row justify-center rounded" key={job._id}>
              <div className="h-full w-full flex flex-row">
                <div className="flex flex-col h-full w-1/4 items-center justify-evenly">
                  <h1>{job.jobtitle}</h1>
                  <h1>{job.jobcategory}</h1>
                  <p className="w-fit overflow-x-hidden">{job.link}</p>
                </div>
                <div className="flex flex-col h-full w-1/2 items-center justify-evenly overflow-clip">
                  <h1>{job.jobdescription}
                  </h1>
                </div>
                <div className="flex flex-col h-full w-1/4 items-center justify-evenly">
                  <h1>{job.experience}</h1>
                  <p>{job.salary}</p>
                </div>
              </div>
              <div className="h-full ml-auto text-4xl pt-7 pr-4 hover:pr-2 transition-all duration-150 hover:bg-gray-800 cursor-pointer pl-3">
                {" "}
                {">"}{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
