"use client";

import { Progress } from "@/components/ui/progress";

interface TodoProgressProps {
  total: number;
  completed: number;
}

export const TodoProgress = ({ total, completed }: TodoProgressProps) => {
  if (total === 0) {
    return null;
  }

  const percentage = (completed / total) * 100;
  let message = `You've completed ${completed} of ${total} tasks. Keep going!`;
  if (percentage === 100) {
    message = "Awesome! All tasks completed! 🎉";
  }

  return (
    <div className="w-full space-y-2 my-4">
      <p className="text-sm font-medium text-center text-primary/80">{message}</p>
      <Progress value={percentage} className="w-full [&>*]:bg-gradient-to-r [&>*]:from-violet-500 [&>*]:to-fuchsia-500" />
    </div>
  );
};