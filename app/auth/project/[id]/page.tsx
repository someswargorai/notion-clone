"use client";

import { useEffect } from "react";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function BlockNoteEditor() {
  const { resolvedTheme } = useTheme();
  const session= useSession();

  const savedData =
    typeof window !== "undefined"
      ? localStorage.getItem("blocknote-content")
      : null;

  const initialContent = savedData ? JSON.parse(savedData) : undefined;

  const editor = useCreateBlockNote({
    initialContent,
  });

  useEffect(() => {
    if (!editor) return;

    const saveContent = () => {
      const content = JSON.stringify(editor.document);
      localStorage.setItem("blocknote-content", content);
    };

    // Save whenever document changes
    editor.onChange(saveContent);
  }, [editor]);

  const handleSaveHTML = async () => {
    const html = await editor.blocksToHTMLLossy(editor.document);

      axios.post("http://localhost:3001/note/content-upload",{content:html},{
        headers: {
          Authorization:`Bearer ${session.data?.token}`
        }
      });
  };



  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div
        className="mx-auto py-5 bg-white shadow-md border overflow-auto z-1 md:py-2m dark:bg-black dark:text-white"
        style={{
          height: "h-[calc(100vh - 200px)]",
        }}
      >
        <BlockNoteView
          editor={editor}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
      </div>
        <Button variant="default" className="absolute top-4 right-4" onClick={handleSaveHTML}>save</Button>
    </div>
  );
}
