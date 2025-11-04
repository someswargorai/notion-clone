"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { formateDate } from "@/utils/formateDate";
import { useAppSelector } from "@/redux/hooks/hook";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const [favourites, setFavourites] = useState<number[]>([]);
  const { projects } = useAppSelector((state) => state.project);
  const router = useRouter();

  const toggleFavourite = (id: number) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleShare = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const url = `${window.location.origin}/auth/project/${id}`;

    if (navigator.share) {
      await navigator.share({
        title: "Check out this project",
        text: "Take a look at this project I’ve been working on:",
        url,
      }).then(() => toast.success("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-w-full p-4 md:p-8 h-screen overflow-auto custom_scrollbar bg-linear-to-b from-gray-50 to-white">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((data) => {
          const isFavourite = favourites.includes(data.id);

          return (
            <div
              key={data.id}
              onClick={() => router.push(`/auth/project/${data.id}`)}
              className="relative border border-gray-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 ease-in-out cursor-pointer"
            >
              {/* --- Action Buttons --- */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {/* Share Button */}
                <button
                  onClick={(e) => handleShare(e, data.id)}
                  className="text-gray-400 hover:text-blue-500 transition-all duration-300"
                  title="Share project"
                >
                  <Share2 size={18} />
                </button>

                {/* Favourite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourite(data.id);
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

              {/* --- Card Content --- */}
              <div className="flex flex-col gap-2 mb-6">
                <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {data.name}
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

              {/* --- Footer Info --- */}
              <div className="text-xs text-gray-400 space-y-1 border-t border-gray-100 pt-3">
                <p>
                  <span className="font-medium text-gray-500">Created:</span>{" "}
                  {formateDate(data.createdAt)}
                </p>
                <p>
                  <span className="font-medium text-gray-500">
                    Last Visited:
                  </span>{" "}
                  {formateDate(data.lastVisitedAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
