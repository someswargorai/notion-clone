"use client";

import { Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopNavbar() {
  const [resize, setResize] = useState(0);
  const router=useRouter();

  useEffect(() => {
    const handleResize = () => {
      setResize(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{ display: resize < 500 ? "flex" : "none" }}
      className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm px-6 py-6 items-center justify-between z-100"
    >
      <div className="flex items-center gap-2 cursor-pointer select-none" onClick={()=>router.push("/")}>
        <div className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center font-bold text-sm">
          N
        </div>
        <h1 className="text-lg font-semibold tracking-tight text-gray-800">
          Notion<span className="text-gray-400 font-normal">.</span>
        </h1>
      </div>

      {/* Right-side icons */}
      <div className="flex items-center gap-5">
        <button
          className="relative text-gray-500 hover:text-blue-600 transition-all"
          title="Favorites"
        >
          <Heart size={20} />
          <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button
          className="relative text-gray-500 hover:text-blue-600 transition-all"
          title="Messages"
        >
          <MessageCircle size={20} />
          <span className="absolute -top-1 -right-2 w-2 h-2 bg-green-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
}
