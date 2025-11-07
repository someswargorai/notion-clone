"use client";

import React from "react";
import Sidebar from "./_components/Sidebar";
import CreateProject from "./_components/CreateProject";
import { useAppSelector } from "@/redux/hooks/hook";
import LogoutModal from "@/components/ui/dialog";
import Navbar from "./_components/Navbar";
import TopNavbar from "./_components/TopNavbar";

function Layout({ children }: { children: React.ReactNode }) {
  const { addProject } = useAppSelector((state) => state.project);
  const { logoutState } = useAppSelector((state) => state.logout);

  return (
    <div className="min-h-full flex">
      <Sidebar />
      <TopNavbar />
      <Navbar />
      {addProject && <CreateProject />}
      {logoutState && <LogoutModal />}
      <div className="flex-1 bg-white overflow-auto pt-[68px] pb-16 md:pt-0 md:pb-0 h-[calc(100vh-80px)] md:h-[calc(100vh-10px)]">
        {children}
      </div>
    </div>
  );
}

export default Layout;
