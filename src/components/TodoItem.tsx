"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";

interface Todo {
  id: string;
  task: string;
  is_complete: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(todo.task);
    showSuccess("Todo copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-4 p-2 border-b animate-slide-in-up transition-colors hover:bg-muted/50">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.is_complete}
        onCheckedChange={() => onToggle(todo.id)}
        aria-label={`Mark ${todo.task} as ${todo.is_complete ? 'incomplete' : 'complete'}`}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={cn(
          "flex-1 text-left cursor-pointer transition-all duration-300",
          todo.is_complete && "line-through text-muted-foreground"
        )}
      >
        {todo.task}
      </label>
      <Button variant="ghost" size="icon" onClick={handleCopy} aria-label={`Copy todo: ${todo.task}`}>
        <Copy className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)} aria-label={`Delete todo: ${todo.task}`}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};