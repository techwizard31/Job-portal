"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Fill up all the details");
    }
    try {
      const response = await fetch(`/api/user/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        sessionStorage.setItem("user", JSON.stringify(result.exists));
        sessionStorage.setItem("token", result.token);
        alert("Login Successfull");
        router.push("/user/main");
      }else{
        alert("Login Unsuccessfull")
      }
    } catch (error) {
      console.log(error);
      alert("Login Unsuccessfull");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full h-screen bg-black font-oxanium">
      <div className="flex flex-col items-center justify-center h-screen dark">
        <div className="w-full max-w-md bg-black rounded-lg shadow-md p-6 border-2 border-white">
          <h2 className="text-3xl font-semibold text-white mb-4 text-center font-oxanium">
            Login
          </h2>
          <form
            className="flex flex-col gap-2"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              placeholder="Registered Email"
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="bg-black text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800 transition ease-in-out duration-150"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-gray-700 transition-all ease-in-out duration-150 cursor-pointer hover:scale-105"
              type="submit"
            >
              Login
            </button>
            <h1 className="text-center text-white mt-2">
              Don't have an account ?{" "}
              <a href="/user/signup" className="underline">
                Regsiter
              </a>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
