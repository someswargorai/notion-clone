"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { formateDate } from "@/utils/formateDate";
import { useAppSelector } from "@/redux/hooks/hook";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [favourites, setFavourites] = useState<string[]>([]);
  const { projects } = useAppSelector((state) => state.project);
  const router = useRouter();
  const { data: session } = useSession();

  const toggleFavourite = (id: string) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleShare = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/auth/project/${id}`;

    if (navigator.share) {
      await navigator.share({
        title: "Check out this project",
        text: "Take a look at this project I’ve been working on:",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-w-full p-2 md:p-8 overflow-y-auto custom_scrollbar bg-linear-to-b from-gray-50 to-white">
      <div className="p-3 bg-gray-50 w-full rounded-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-white rounded-xl shadow-sm">
          <div className="col-span-2">
            <div className="grid grid-cols-3 lg:grid-cols-12 xl:grid-cols-12 gap-3">
              <div className="col-span-3 lg:col-span-12 xl:col-span-5">
                <Input
                  type="text"
                  placeholder="Search by employee name / ID"
                  className="h-10 w-full"
                />
              </div>

              <div className="col-span-1 lg:col-span-4 xl:col-span-2">
                <Select>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Number 1</SelectItem>
                    <SelectItem value="2">Number 2</SelectItem>
                    <SelectItem value="3">Number 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1 lg:col-span-4 xl:col-span-3">
                <Select>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Number 1</SelectItem>
                    <SelectItem value="2">Number 2</SelectItem>
                    <SelectItem value="3">Number 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1 lg:col-span-4 xl:col-span-2">
                <Select>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Number 1</SelectItem>
                    <SelectItem value="2">Number 2</SelectItem>
                    <SelectItem value="3">Number 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-end">
            <div className="flex gap-1">
              <Button variant="outline" className="h-10">
                Dummy
              </Button>
              <Button className="h-10 bg-black text-white hover:bg-gray-800">
                Create Project
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4 mb-4">
        {projects.map((data) => {
          const isFavourite = favourites.includes(data._id);

          return (
            <div
              key={data._id}
              onClick={() => router.push(`/auth/project/${data._id}`)}
              className="relative border border-gray-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={(e) => handleShare(e, data._id)}
                  className="text-gray-400 hover:text-blue-500 transition-all duration-300"
                  title="Share project"
                >
                  <Share2 size={18} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourite(data._id);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-all duration-300"
                  title="Add to favourites"
                >
                  <Heart
                    size={20}
                    fill={isFavourite ? "red" : "transparent"}
                    className={`transition-transform duration-300 ${
                      isFavourite
                        ? "scale-110 text-red-500"
                        : "text-gray-400 font-light"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {data.title}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {data.description.length < 150 ? (
                    data.description
                  ) : (
                    <span title={data.description}>
                      {data.description.slice(0, 150)}...
                    </span>
                  )}
                </p>
              </div>

              <div className="text-xs text-gray-400 space-y-1 border-t border-gray-100 pt-3">
                <p>
                  <span className="font-medium text-gray-500">Created:</span>{" "}
                  {formateDate(data.createdAt)}
                </p>
                <p>
                  <span className="font-medium text-gray-500">
                    Last Updated:
                  </span>{" "}
                  {formateDate(data.updatedAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
