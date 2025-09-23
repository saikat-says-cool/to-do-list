"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

export const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="bg-white/80 dark:bg-black/80"
      />
      <Button type="submit" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold">Add</Button>
    </form>
  );
};