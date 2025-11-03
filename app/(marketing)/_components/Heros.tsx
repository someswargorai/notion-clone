"use client";

import Image from "next/image";

function Heros() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[400px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px] dark:hidden">
          <Image
            src="/notion-removebg-preview.png"
            fill
            className="object-contain bg-transparent "
            alt="Documents"
          />
        </div>
        <div className="relative h-[300px] w-[300px] hidden md:block dark:hidden">
          <Image
            src="/notion-removebg-preview-1.png"
            fill
            className="object-contain bg-transparent"
            alt="Reading"
          />
        </div>
      </div>
    </div>
  );
}

export default Heros;
