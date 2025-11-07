"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  User,
  Lock,
  Bell,
  Shield,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  Camera,
  Globe,
  Heart,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

// Validation for name/email change (optional)
const profileSchema = yup.object({
  name: yup
    .string()
    .min(2, "Too short")
    .required("Name required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email required"),
});

type ProfileFormData = yup.InferType<typeof profileSchema>;

export default function InstagramSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    messages: false,
    follows: true,
  });

  const [user, setUser] = useState({
    name: "Alex Morgan",
    username: "alexmorgan",
    email: "alex@example.com",
    avatar: null as string | null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: { name: user.name, email: user.email },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    setUser({ ...user, ...data });
    alert("Profile updated!");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const settings = [
    {
      label: "Edit Profile",
      icon: User,
      action: () =>
        document.getElementById("edit-modal")?.classList.remove("hidden"),
    },
    { label: "Change Password", icon: Lock, href: "#" },
    { label: "Push Notifications", icon: Bell, action: () => {} },
    { label: "Privacy", icon: Shield, href: "#" },
    { label: "Language", icon: Globe, value: "English (US)", href: "#" },
    {
      label: "Dark Mode",
      icon: darkMode ? Sun : Moon,
      toggle: () => setDarkMode(!darkMode),
    },
    {
      label: "Log Out",
      icon: LogOut,
      action: () => alert("Logged out!"),
      danger: true,
    },
  ];

  return (
    <>
      <div
        className={`min-h-screen dark:bg-black dark:text-white bg-white text-black"
        } transition-colors`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 p-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="Avatar"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-10 h-10 text-gray-500" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-1 bg-blue-500 text-white rounded-full cursor-pointer">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="font-semibold text-lg">{user.username}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.name}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800">
            {settings.map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${
                  item.danger ? "text-red-500" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value && (
                    <span className="text-sm text-gray-500">{item.value}</span>
                  )}
                  {item.toggle && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        item.toggle();
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        darkMode ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          darkMode ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  )}
                  {!item.toggle && (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 border-b border-gray-200 dark:border-gray-200">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Push Notifications
            </h3>
            <div className="space-y-3">
              {[
                { key: "likes", label: "Likes" },
                { key: "comments", label: "Comments" },
                { key: "messages", label: "Direct Messages" },
                { key: "follows", label: "New Followers" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm">{item.label}</span>
                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: !prev[
                          item.key as keyof typeof notifications
                        ],
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[item.key as keyof typeof notifications]
                        ? "bg-blue-500"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications[item.key as keyof typeof notifications]
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div
            id="edit-modal"
            className="fixed inset-0 bg-black/50 hidden flex items-end justify-center z-50"
            onClick={(e) =>
              e.target === e.currentTarget &&
              e.currentTarget.classList.add("hidden")
            }
          >
            <div
              className={`w-full max-w-md bg-white dark:bg-black rounded-t-3xl p-6 ${
                darkMode ? "text-white" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("edit-modal")
                      ?.classList.add("hidden")
                  }
                  className="text-lg"
                >
                  Cancel
                </button>
                <h3 className="font-semibold text-lg">Edit Profile</h3>
                <button className="text-blue-500 font-medium">Done</button>
              </div>

              <form
                onSubmit={handleSubmit(onProfileSubmit)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    {...register("name")}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } dark:bg-gray-900 dark:border-gray-700`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } dark:bg-gray-900 dark:border-gray-700`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
