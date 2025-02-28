"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password || !url || !name ) {
      alert("Fill up all the details");
    }
    try {
      const response = await fetch(`/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password, name:name, linkedin:url }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result)
        alert("Signup Successfull");
        sessionStorage.setItem("user",JSON.stringify(result.user))
        sessionStorage.setItem("token",result.token)
        router.push("/user/main");
      }else{
        alert("Registration Unsuccessfull")
      }
    } catch (error) {
      console.log(error);
      alert("Registration Unsuccessfull");
      setEmail("");
      setPassword("");
      setUrl("");
      setName("");
    }
  };
  return (
    <div className="w-full h-screen bg-black">
      <div className="flex flex-col items-center justify-center h-screen dark">
        <div className="w-full max-w-md bg-black rounded-lg shadow-md p-6 border-2 border-white">
          <h2 className="text-3xl font-semibold text-white mb-4 text-center font-oxanium">
            Sign Up
          </h2>
          <form
            className="flex flex-col gap-2"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              placeholder="Full Name"
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <input
              placeholder="Personal Email"
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <textarea
              placeholder="Linkedin Url"
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              name="cover_letter"
              value={url}
              onChange={(e)=>setUrl(e.target.value)}
            ></textarea>
            <button
              className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-gray-700 transition-all ease-in-out duration-150 cursor-pointer hover:scale-105"
              type="submit"
            >
              Sign Up
            </button>
            <h1 className="text-center text-white mt-2">
              Already have an account ?{" "}
              <a href="/user/login" className="underline">
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
