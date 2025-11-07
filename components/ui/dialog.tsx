"use client";

import { useState } from "react";
import { Loader, LogOut, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleLogoutState } from "@/redux/slices/logoutSlice";
import { toast } from "sonner";

export default function LogoutModal() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    dispatch(toggleLogoutState(false));
    toast.success("User logged out");
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="relative dark:bg-black dark:text-white dark:border-1 text-black w-[90%] max-w-md rounded-lg bg-white shadow-lg p-6 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <LogOut className="h-5 w-5 text-gray-600" />
              Sign out
            </h2>
            <button
              onClick={() => dispatch(toggleLogoutState(false))}
              className="rounded-md p-1 hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to log out? You’ll need to sign in again to
            access your workspace.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => dispatch(toggleLogoutState(false))}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md bg-gray-800 text-white hover:bg-black transition disabled:opacity-70 cursor-pointer"
            >
              {loading ? <Loader/> : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

<style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
`}</style>;
