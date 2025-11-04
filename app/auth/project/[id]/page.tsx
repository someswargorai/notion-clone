"use client";

import React, { useEffect } from "react";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

export default function BlockNoteEditor() {

  const savedData = typeof window !== "undefined"
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
    console.log("Generated HTML:", html);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4 border">
        <BlockNoteView editor={editor} theme="light" />

        <button
          onClick={handleSaveHTML}
          className="mt-4 px-4 py-2 bg-black text-white rounded-md"
        >
          Save Content
        </button>
      </div>
    </div>
  );
}
