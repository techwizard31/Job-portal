"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

function Open() {
    const router = useRouter();
  return (
    <div className='w-full h-screen text-white bg-black'>
        <h1 className='font-oxanium text-7xl text-center pt-10'>Jobify</h1>
        <div className='flex w-full h-[calc(100vh-5rem)] flex-row items-center justify-center gap-20'>
            <div className='w-1/5 h-44 font-oxanium text-4xl border-2 border-white text-center rounded-3xl cursor-pointer hover:scale-105 transition-all duration-150 flex justify-center items-center'onClick={()=>router.push("/company/register")}>HireZone</div>
            <div className='w-1/5 h-44 font-oxanium text-4xl border-2 border-white text-center rounded-3xl cursor-pointer hover:scale-105 transition-all duration-150 flex justify-center items-center' onClick={()=>router.push("/user/signup")}>CareerZone</div>
        </div>
    </div>
  )
}

export default Open