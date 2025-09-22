"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AddNoteForm } from "./AddNoteForm";
import { NoteItem } from "./NoteItem";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { showError, showSuccess } from "@/utils/toast";

interface Note {
  id: string;
  content: string;
}

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("id, content")
      .order("created_at", { ascending: false });

    if (error) {
      showError("Could not fetch notes.");
      console.error(error);
    } else {
      setNotes(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = async (content: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        showError("You must be logged in to add a note.");
        return;
    }

    const { data, error } = await supabase
      .from("notes")
      .insert([{ content, user_id: user.id }])
      .select()
      .single();

    if (error) {
      showError("Failed to add note.");
    } else if (data) {
      setNotes([data, ...notes]);
      showSuccess("Note added!");
    }
  };

  const handleUpdateNote = async (id: string, content: string) => {
    const { error } = await supabase
      .from("notes")
      .update({ content })
      .eq("id", id);

    if (error) {
      showError("Failed to update note.");
    } else {
      setNotes(notes.map(n => n.id === id ? { ...n, content } : n));
      showSuccess("Note updated!");
    }
  };

  const handleDeleteNote = async (id: string) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      showError("Failed to delete note.");
    } else {
      setNotes(notes.filter((note) => note.id !== id));
      showSuccess("Note deleted!");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>My Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <AddNoteForm onAdd={handleAddNote} />
        <div className="mt-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading notes...</p>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground mt-4">
              No notes yet. Add one above!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};