"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Heading1,
  Heading2,
} from "lucide-react";

type ButtonItemProps = {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title?: string;
};


function ButtonItem({ onClick, isActive, children, title }:ButtonItemProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 ${
        isActive ? "bg-gray-200" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      }),
      Underline,
      Placeholder.configure({
        placeholder: "Start writing something amazing...",
      }),
    ],
    content: "<p>Start writing...</p>",
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-black overflow-auto p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-200">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
          <ButtonItem
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={16} />
          </ButtonItem>

          <ButtonItem
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={16} />
          </ButtonItem>

          <ButtonItem
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </ButtonItem>

          <ButtonItem
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </ButtonItem>

          <div className="w-px bg-gray-300 mx-1" />

          <ButtonItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </ButtonItem>

          <ButtonItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </ButtonItem>

          <div className="w-px bg-gray-300 mx-1" />

          <ButtonItem
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={16} />
          </ButtonItem>

          <ButtonItem
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </ButtonItem>

          <ButtonItem
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Quote"
          >
            <Quote size={16} />
          </ButtonItem>

          <ButtonItem
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <Code size={16} />
          </ButtonItem>

          <div className="w-px bg-gray-300 mx-1" />

          <ButtonItem onClick={() => editor.chain().focus().undo().run()} title="Undo">
            <Undo size={16} />
          </ButtonItem>

          <ButtonItem onClick={() => editor.chain().focus().redo().run()} title="Redo">
            <Redo size={16} />
          </ButtonItem>
        </div>

        {/* Editor Area */}
        <EditorContent
          editor={editor}
          className="prose prose-sm sm:prose-base max-w-none p-6 focus:outline-none min-h-[500px]"
        />
      </div>
    </div>
  );
}
