"use client";

import { useState } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { TodoItem } from "./TodoItem";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: true },
    { id: 3, text: "Deploy to production", completed: false },
  ]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>My Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <AddTodoForm onAdd={handleAddTodo} />
        <div className="mt-4">
          {todos.length > 0 ? (
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