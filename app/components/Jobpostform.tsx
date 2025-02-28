"use client";
import React, { FormEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import exp from "constants";

function Jobpostform({ closeModal }: { closeModal: () => void }) {
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      !experience ||
      !salary ||
      !info ||
      !title ||
      !link ||
      !category ||
      !date
    ) {
      alert("Fill up all the details");
    }
    try {
      const companyData = JSON.parse(sessionStorage.getItem("company") || "{}");
      const formattedDate = new Date(date); 
      const response = await fetch(`/api/postjob`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          experience: experience,
          salary: salary,
          jobdescription: info,
          jobtitle: title,
          link: link,
          jobcategory: category,
          lastdate: formattedDate,
          companyname: companyData.name,
          company_id: companyData._id,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("Job Posted Successfully");
        closeModal();
      } else {
        alert("Job Posting failed");
      }
    } catch (error) {
      console.log(error);
      alert("Job Posting failed");
      setExperience("");
      setSalary("");
      setInfo("");
      setCategory("");
      setLink("");
      setCategory("");
      setTitle("");
      setDate("");
    }
  };

  return (
    <div className="flex w-full h-screen bg-black flex-col z-10 absolute font-oxanium">
      <div
        className="mr-auto rotate-45 ml-4 mt-4 text-4xl cursor-pointer"
        onClick={closeModal}
      >
        <p>+</p>
      </div>

      <div className="flex flex-col items-center justify-center h-screen dark">
        <div className="w-full max-w-md bg-black rounded-lg shadow-md p-6 border-2 border-white">
          <h2 className="text-3xl font-semibold text-white mb-4 text-center font-oxanium">
            Post a Job
          </h2>
          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              placeholder="Job title"
              className="bg-gray-800 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Job Description"
              className="bg-gray-800 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              name="cover_letter"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              required
            ></textarea>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="w-[180px] bg-gray-800">
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent className="z-10  bg-gray-800 text-white">
                <SelectItem
                  value="Software and IT"
                  className="hover:bg-gray-600"
                >
                  Software and IT
                </SelectItem>
                <SelectItem value="Account" className="hover:bg-gray-600">
                  Account
                </SelectItem>
                <SelectItem value="Sales" className="hover:bg-gray-600">
                  Sales
                </SelectItem>
                <SelectItem value="Legal" className="hover:bg-gray-600">
                  Legal
                </SelectItem>
                <SelectItem value="Publicity" className="hover:bg-gray-600">
                  Publicity
                </SelectItem>
              </SelectContent>
            </Select>

            <input
              placeholder="Experience Required"
              className="bg-gray-800 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition ease-in-out duration-150"
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
            <input
              placeholder="Expected Salary"
              className="bg-gray-800 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
            <input
              placeholder="Registration Link"
              className="bg-gray-800 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-600 transition ease-in-out duration-150"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
            <input
              type="date"
              value={date}
              placeholder="Last Date"
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded-md bg-gray-800 w-4/5"
              required
              min={today}
            />
            <button
              className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-gray-700 transition-all ease-in-out duration-150 cursor-pointer hover:scale-105"
              type="submit"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Jobpostform;
