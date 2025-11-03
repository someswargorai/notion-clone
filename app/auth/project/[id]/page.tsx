"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing...</p>",
    immediatelyRender: false,
  });

  return (
    <div className="min-h-screen bg-gray-50 text-black overflow-auto">
      <EditorContent
        editor={editor}
        className="max-w-3xl mx-auto h-screen p-10 bg-white outline-none shadow-sm rounded-md focus:outline-none"
      />
    
    </div>
  );
}
