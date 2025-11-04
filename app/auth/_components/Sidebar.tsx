"use client";

import {
  Home,
  Settings,
  Heart,
  Folder,
  FileText,
  Bell,
  MessageCircle,
  LogOut,
  User,
  Menu,
  ChevronUp,
  ChevronDown,
  Plus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { toggleProjectState } from "@/redux/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { useRouter } from "next/navigation";
import { toggleLogoutState } from "@/redux/slices/logoutSlice";

const fixed_width = 256;
const collapsed_width = 80;

function Sidebar() {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(fixed_width);
  const [resize, setResize]=useState(0);
  const [currentSideBar, setCurrentSideBar] = useState("Home");
  const [hide, setHide] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const [drag, setDrag] = useState(false);
  const router = useRouter();

  const items = [
    { id: 1, name: "Home", isCollapsable: false, icon: <Home size={18} /> },
    {
      id: 2,
      name: "Projects",
      icon: <Folder size={18} />,
      isCollapsable: true,
      child: projects,
    },
    {
      id: 3,
      name: "Documents",
      isCollapsable: false,
      icon: <FileText size={18} />,
    },
    {
      id: 4,
      name: "Favorites",
      isCollapsable: false,
      icon: <Heart size={18} />,
    },
    {
      id: 6,
      name: "Messages",
      isCollapsable: false,
      icon: <MessageCircle size={18} />,
    },
    {
      id: 7,
      name: "Notifications",
      isCollapsable: true,
      child: [
        { id: "child_notification_1", name: "Notification 1" },
        { id: "child_notification_2", name: "Notification 2" },
      ],
      icon: <Bell size={18} />,
    },
    {
      id: 8,
      name: "Settings",
      isCollapsable: true,
      child: [
        { id: "child_settings_1", name: "Settings 1" },
        { id: "child_settings_2", name: "Settings 2" },
      ],
      icon: <Settings size={18} />,
    },
    { id: 9, name: "Logout", isCollapsable: false, icon: <LogOut size={18} /> },
  ];

  useEffect(() => {
    
    const handleResize = () => {
      setWidth(window.innerWidth < 700 ? collapsed_width : fixed_width);
      setResize(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mouseDown = (e: globalThis.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setHide({});
      }
    };
    window.addEventListener("mousedown", mouseDown);
    return () => window.removeEventListener("mousedown", mouseDown);
  }, []);

  const handleAddProjects = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    dispatch(toggleProjectState(true));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        setWidth((prev) =>
          prev === fixed_width ? collapsed_width : fixed_width
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!drag) return;
      const newWidth = Math.min(Math.max(e.clientX, 257), 560);
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setDrag(false);
    };

    if (drag) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [drag]);

  return (
    <div
      className={`bg-white border-r border-gray-200 text-gray-800 min-h-screen p-4 transition-all duration-300 ease-in-out shadow-sm flex-col ${
        width >= fixed_width
          ? "flex justify-between"
          : "flex justify-center items-center"
      }`}
      style={{ width: width, display: resize < 500 ? "none" : "block" }}
    >
      <div
        onMouseDown={() => setDrag(true)}
        className="cursor-w-resize min-h-screen fixed top-0 select-none"
        style={{
          width: "10px",
          left: width,
        }}
      ></div>
      <div
        className={`flex items-center ${
          width >= fixed_width ? "justify-between" : "justify-center"
        }`}
      >
        {width >= fixed_width && (
          <p
            className="text-lg font-semibold tracking-tight text-gray-900 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Notion
          </p>
        )}
        <Menu
          size={22}
          className="text-gray-500 cursor-pointer hover:text-gray-800 transition-colors"
          onClick={() =>
            setWidth(width >= fixed_width ? collapsed_width : fixed_width)
          }
        />
      </div>

      <div
        className={`pt-8 flex-1 ${
          width >= fixed_width ? "overflow-y-auto" : "overflow-visible"
        } custom_scrollbar`}
      >
        {items.map((data) => (
          <div key={data.id} className="relative mb-1">
            <div
              onClick={() => {
                setHide((prev) => ({
                  [data.name]: !prev[data.name],
                }));
                setCurrentSideBar(data.name);
                if (data.name === "Logout") {
                  dispatch(toggleLogoutState(true));
                } else if (data.name === "Home") {
                  router.push("/auth");
                }
              }}
              className={`group flex items-center p-2 gap-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-blue-100
                ${data.name === currentSideBar && "bg-blue-100"}
              `}
            >
              <span
                className={`group-hover:text-blue-600 ${
                  data.name === currentSideBar
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {data.icon}
              </span>

              {width >= fixed_width && (
                <div className="flex justify-between w-full items-center">
                  <span className="text-sm font-medium">{data.name}</span>
                  <div className="flex gap-2">
                    {data.name === "Projects" && (
                      <Plus
                        size={16}
                        className="text-gray-400 hover:bg-gray-200 hover:p-1 hover:rounded-xs"
                        onClick={handleAddProjects}
                      />
                    )}
                    {data?.isCollapsable &&
                      (!hide[data.name] ? (
                        <ChevronDown size={16} className="text-gray-400" />
                      ) : (
                        <ChevronUp size={16} className="text-gray-400" />
                      ))}
                  </div>
                </div>
              )}

              {width <= collapsed_width &&
                hide[data.name] &&
                data?.isCollapsable && (
                  <div
                    ref={modalRef}
                    className="absolute bg-white border border-gray-100 shadow-lg top-0 left-full ml-2 rounded-md p-2 flex flex-col gap-1 z-50 w-44"
                  >
                    {data?.child?.map((child) => (
                      <p
                        key={child?.id}
                        title={child?.name}
                        className="text-sm px-3 py-2 rounded-md hover:bg-blue-200 hover:text-white transition-colors"
                      >
                        {child?.name}
                      </p>
                    ))}
                  </div>
                )}
            </div>

            {width >= fixed_width && hide[data.name] && data?.isCollapsable && (
              <div className="ml-8 mt-1 flex flex-col gap-1 border-l border-gray-200 pl-3 transition-all duration-200">
                {data?.child?.map((child) => (
                  <p
                    key={child?.id}
                    title={child?.name}
                    className="text-sm py-1.5 px-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {child?.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <div
          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 ${
            width <= collapsed_width ? "justify-center" : ""
          }`}
        >
          <User size={18} className="text-gray-500" />
          {width >= fixed_width && (
            <span className="text-sm font-medium text-gray-700">Profile</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
