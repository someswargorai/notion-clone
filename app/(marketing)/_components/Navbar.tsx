"use client";

import { useScrollTop } from "@/hooks/user-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

function Navbar() {
  const scrolled = useScrollTop();
  const router= useRouter();
  const path=usePathname();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {path!=="/sign-in" && <div className="flex gap-2 ">
          
          <Button className="cursor-pointer" onClick={()=>router.push("/sign-in")}>Sign in</Button>

          <Button variant="secondary" className="cursor-pointer" onClick={()=>router.push("/sign-in")}>Sign up for free</Button>
        </div>}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
