"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AddNoteFormProps {
  onAdd: (content: string) => void;
}

export const AddNoteForm = ({ onAdd }: AddNoteFormProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a new note"
        rows={4}
        className="bg-white/80 dark:bg-black/80"
        aria-label="Add a new note"
      />
      <Button type="submit" className="self-end bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold">Add Note</Button>
    </form>
  );
};