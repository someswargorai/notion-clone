"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Hero() {

  const router=useRouter();
  return (
    <section className="flex flex-col items-center justify-center text-center py-0 sm:py-6 px-6 bg-linear-to-b">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="dark:text-white text-2xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          The All-in-One Workspace <br /> for Notes, Docs & Ideas
        </h1>

        <p className="text-md md:text-xl text-gray-600 mb-10">
          Simplify your thoughts, plan projects, and organize knowledge — all in one
          seamless Notion-style editor built with modern web tech.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button className="px-6 py-3 text-lg rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer" onClick={()=>router.push('/auth')}>
            Start Writing
          </Button>

          <Button
            variant="outline"
            className="px-6 py-3 text-lg rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            Learn More
          </Button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-gray-400 mt-8"
        >
          Built by Someswar Gorai — inspired by Notion, powered by Next.js ⚡
        </motion.p>
      </motion.div>
    </section>
  );
}
