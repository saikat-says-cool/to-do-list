"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Notes = () => {
  const [notes, setNotes] = useState(
    "This is a sample note.\n\nYou can write anything you want here!"
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Extra Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Type your notes here."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={15}
          className="resize-none"
        />
      </CardContent>
    </Card>
  );
};