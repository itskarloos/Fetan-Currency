"use client";

import React from "react";

import NavBar from "@/components/shared/NavBar";
import Hero from "@/components/shared/Hero";
import Rate from "@/components/shared/Rate";

export default function Home() {


  return (
    <div
      className="bg-black w-full dark:border dark:border-white/[0.1] overflow-clip"
      
    >
      <NavBar />
      <Hero />
      <Rate />
     
    </div>
  );
}
