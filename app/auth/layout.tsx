"use client";

import React from "react";
import Sidebar from "./_components/Sidebar";
import CreateProject from "./_components/CreateProject";
import { useAppSelector } from "@/redux/hooks/hook";

function Layout({ children }: { children: React.ReactNode }) {

  const {addProject}= useAppSelector((state)=>state.project);
  return (
    <div className="min-h-full flex">
      <Sidebar />
       {addProject && <CreateProject/>}
      <div className="flex-1 bg-white">{children}</div>
    </div>
  );
}

export default Layout;
