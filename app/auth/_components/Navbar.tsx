"use client";

import { Home, User, LogOut, Plus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks/hook";
import { toggleLogoutState } from "@/redux/slices/logoutSlice";
import { toggleProjectState } from "@/redux/slices/projectSlice";
import { useEffect, useState } from "react";


export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [resize, setResize]=useState(0);

  useEffect(() => {
    const handleResize = () => {
      setResize(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (route: string) => {
    if (route === "logout") {
      dispatch(toggleLogoutState(true));
      return;
    }
    if (route === "addProject") {
      dispatch(toggleProjectState(true));
      return;
    }
    router.push(route);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 justify-around items-center py-3 px-2 shadow-md sm:hidden z-100 dark:bg-black dark:text-white flex flex-row" >
      <button
        onClick={() => handleNavClick("/auth")}
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-all"
      >
        <Home size={20} />
        <span className="text-xs">Home</span>
      </button>


      <button
        onClick={() => handleNavClick("/auth/settings")}
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-all"

      >
        <Settings size={20} />
        <span className="text-xs">Settings</span>
      </button>

      <button
        onClick={() => handleNavClick("addProject")}
        className="flex flex-col items-center text-white bg-blue-600 rounded-full p-3 -mt-1 shadow-lg hover:bg-blue-700 transition-all"
      >
        <Plus size={22} />
      </button>


      <button
        onClick={() => handleNavClick("/auth/profile")}
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-all"
      >
        <User size={20} />
        <span className="text-xs">Me</span>
      </button>

      <button
        onClick={() => handleNavClick("logout")}
        className="flex flex-col items-center text-gray-500 hover:text-red-600 transition-all"
      >
        <LogOut size={20} />
        <span className="text-xs">Logout</span>
      </button>
    </div>
  );
}
