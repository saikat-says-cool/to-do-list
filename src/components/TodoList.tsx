"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AddTodoForm } from "./AddTodoForm";
import { TodoItem } from "./TodoItem";
import { TodoProgress } from "./TodoProgress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { showError, showSuccess } from "@/utils/toast";

interface Todo {
  id: string;
  task: string;
  is_complete: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .select("id, task, is_complete")
      .order("created_at", { ascending: true });

    if (error) {
      showError("Could not fetch todos.");
      console.error(error);
    } else {
      setTodos(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (task: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        showError("You must be logged in to add a todo.");
        return;
    }

    const { data, error } = await supabase
      .from("todos")
      .insert([{ task, user_id: user.id }])
      .select()
      .single();

    if (error) {
      showError("Failed to add todo.");
    } else if (data) {
      setTodos([...todos, data]);
      showSuccess("Todo added!");
    }
  };

  const handleToggleTodo = async (id: string) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    if (!todoToToggle) return;

    const { error } = await supabase
      .from("todos")
      .update({ is_complete: !todoToToggle.is_complete })
      .eq("id", id);

    if (error) {
      showError("Failed to update todo.");
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, is_complete: !todo.is_complete } : todo
        )
      );
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      showError("Failed to delete todo.");
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
      showSuccess("Todo deleted!");
    }
  };

  const completedCount = todos.filter(t => t.is_complete).length;

  return (
    <Card className="w-full max-w-md bg-white/60 dark:bg-black/60 backdrop-blur-lg border-violet-200/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-primary">My Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <TodoProgress total={todos.length} completed={completedCount} />
        <AddTodoForm onAdd={handleAddTodo} />
        <div className="mt-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading todos...</p>
          ) : todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground mt-4">
              No todos yet. Add one above!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};