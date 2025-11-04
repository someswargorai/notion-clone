"use client";

import { useEffect } from "react";
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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto bg-white shadow-md border h-screen overflow-auto z-1 py-20 md:py-2">
        <BlockNoteView editor={editor} theme="light"/>
      </div>
    </div>
  );
}
