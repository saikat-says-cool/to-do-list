import { TodoApp } from "@/components/TodoApp";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <TodoApp />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;