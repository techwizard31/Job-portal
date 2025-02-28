"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function page() {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password || !contact || !name ) {
      alert("Fill up all the details");
    }
    try {
      const response = await fetch(`/api/company/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password, phonenumber:contact, name:name, info:info }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result)
        alert("Registration Successfull");
        sessionStorage.setItem("company",JSON.stringify(result.comapany))
        sessionStorage.setItem("token",result.token)
        router.push("/company/main");
      }else{
        alert("Registration Unsuccessfull")
      }
    } catch (error) {
      console.log(error);
      alert("Registration Unsuccessfull");
      setEmail("");
      setPassword("");
      setInfo("");
      setContact("");
      setName("");
    }
  };
  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#2E073F] via-[#000B58] to-[#2E073F] font-oxanium">
      <div className="flex flex-col items-center justify-center h-screen dark">
        <div className="w-full max-w-md bg-black rounded-lg shadow-md p-6 border-2 border-bg-gradient-to-r from-[#2E073F] via-[#000B58] to-[#2E073F]">
          <h2 className="text-3xl font-semibold text-white mb-4 text-center font-oxanium">
            Company Registration
          </h2>
          <form
            className="flex flex-col gap-2"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              placeholder="Company Name"
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <input
              placeholder="Company Email"
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input
              placeholder="Contact No."
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="text"
              value={contact}
              onChange={(e)=>setContact(e.target.value)}
            />
            <input
              placeholder="Password"
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <textarea
              placeholder="Info about company"
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              name="cover_letter"
              value={info}
              onChange={(e)=>setInfo(e.target.value)}
            ></textarea>
            <button
              className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-gray-700 transition-all ease-in-out duration-150 cursor-pointer hover:scale-105"
              type="submit"
            >
              Register
            </button>
            <h1 className="text-center text-white mt-2">
              Already have an account ?{" "}
              <a href="/company/login" className="underline">
                Log In
              </a>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
