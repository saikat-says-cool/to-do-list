"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TodoList } from "./TodoList";
import { Notes } from "./Notes";

export const TodoApp = () => {
  return (
    <Tabs defaultValue="todos" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <TabsTrigger value="todos" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white font-bold">Todos</TabsTrigger>
        <TabsTrigger value="notes" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white font-bold">Notes</TabsTrigger>
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