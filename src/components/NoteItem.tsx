"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Save, Edit, X, Copy } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface Note {
  id: string;
  content: string;
}

interface NoteItemProps {
  note: Note;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export const NoteItem = ({ note, onUpdate, onDelete }: NoteItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);

  const handleUpdate = () => {
    onUpdate(note.id, content);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(note.content);
    showSuccess("Note copied to clipboard!");
  };

  return (
    <div className="p-2 border-b animate-slide-in-up transition-colors hover:bg-muted/50">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            aria-label="Edit note content"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} aria-label="Cancel editing">
              <X className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleUpdate} aria-label="Save note">
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4">
          <p className="flex-1 whitespace-pre-wrap py-2">{note.content}</p>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleCopy} aria-label={`Copy note: ${note.content.substring(0, 20)}...`}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} aria-label={`Edit note: ${note.content.substring(0, 20)}...`}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(note.id)} aria-label={`Delete note: ${note.content.substring(0, 20)}...`}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};