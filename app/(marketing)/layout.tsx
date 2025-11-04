import React from "react";
import Navbar from "./_components/Navbar";

function Marketinglayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar/>
      <main className="h-full pt-30 md:pt-40">{children}</main>
    </div>
  );
}

export default Marketinglayout;
