import { TodoApp } from "@/components/TodoApp";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 via-pink-200 to-red-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="absolute top-0 right-0 -mt-12">
          <Button onClick={handleLogout} variant="outline" className="bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            Logout
          </Button>
        </div>
        <TodoApp />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;