"use client";

import { useAppDispatch } from "@/redux/hooks/hook";
import { addNewProject, toggleProjectState } from "@/redux/slices/projectSlice";
import axios from "axios";
import { Loader, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const session= useSession();
  const dispatch = useAppDispatch();

  const Cancel = () => {
    dispatch(toggleProjectState(false));
  };

  const handleSave = async() => {
    try {
      setLoading(true);
    
      axios.post("http://localhost:3001/project/project-creation",{title:title, description:description},{
        headers: {
          Authorization:`Bearer ${session.data?.token as unknown as string}`
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        const payload = {
          id: Date.now(),
          name: title,
          description: description,
          createdAt: Date.now(),
          lastVisitedAt: Date.now(),
        };
        dispatch(addNewProject(payload));
        setLoading(false);
        Cancel();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-50">
      <div className="bg-gray-50 border border-gray-300 w-80 sm:w-100 h-83 p-4 rounded-sm relative">
        <p className="text-gray-500 font-bold text-start text-xl">
          Project Creation Wizard
        </p>
        <p className="text-gray-500">Time to create something epic 💥</p>

        <span className="absolute top-2 right-2">
          <X
            size={25}
            className="text-gray-600 cursor-pointer"
            onClick={Cancel}
          />
        </span>

        <div className="pt-5 flex flex-col gap-2 h-50">
          <input
            type="text"
            placeholder="Type a title"
            className="p-2 border border-gray-200 w-full h-12 rounded-md placeholder:text-gray-400 text-black"
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write a detailed description..."
            className="border border-gray-200 p-2 w-full h-28 rounded-md resize-none focus:outline-none focus:ring-2 text-black focus:ring-blue-400 placeholder:text-gray-400"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full justify-end">
          <button
            className="cursor-pointer text-white bg-gray-700 w-[100px] rounded-sm p-2"
            onClick={Cancel}
          >
            Cancel
          </button>
          <button
            className="cursor-pointer border border-black text-black w-[150px] rounded-sm p-2"
            onClick={handleSave}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader size={20} />
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
