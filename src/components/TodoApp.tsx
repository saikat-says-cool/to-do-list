"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TodoList } from "./TodoList";
import { Notes } from "./Notes";

export const TodoApp = () => {
  return (
    <Tabs defaultValue="todos" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="todos">Todos</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="todos">
        <TodoList />
      </TabsContent>
      <TabsContent value="notes">
        <Notes />
      </TabsContent>
    </Tabs>
  );
};