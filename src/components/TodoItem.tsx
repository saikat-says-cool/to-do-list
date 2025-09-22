"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <div className="flex items-center gap-4 p-2 border-b">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.is_complete}
        onCheckedChange={() => onToggle(todo.id)}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={cn(
          "flex-1 text-left cursor-pointer",
          todo.is_complete && "line-through text-muted-foreground"
        )}
      >
        {todo.task}
      </label>
      <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};