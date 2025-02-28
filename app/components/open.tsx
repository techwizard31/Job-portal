"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

function Open() {
    const router = useRouter();
  return (
    <div className='w-full h-screen text-white bg-gradient-to-r from-[#2E073F] via-[#000B58] to-[#2E073F]'>
        <h1 className='font-oxanium text-9xl text-center pt-10 font-bold bg-clip-text text-transparent bg-gradient-to-t from-[#21052d] via-[#63688f] to-[#21052d]'>Jobify</h1>
        <div className='flex w-full h-[calc(100vh-5rem)] flex-row items-center justify-center gap-20'>
            <div className='w-1/5 h-44 font-oxanium text-5xl border-2 border-white text-center rounded-3xl cursor-pointer hover:scale-105 transition-all duration-150 flex justify-center items-center hover:text-[#AA60C8] hover:border-[#AA60C8]'onClick={()=>router.push("/company/register")}>HireZone</div>
            <div className='w-1/5 h-44 font-oxanium text-5xl border-2 border-white text-center rounded-3xl cursor-pointer hover:scale-105 transition-all duration-150 flex justify-center items-center hover:text-[#AA60C8] hover:border-[#AA60C8]' onClick={()=>router.push("/user/signup")}>CareerZone</div>
        </div>
    </div>
  )
}

export default Open