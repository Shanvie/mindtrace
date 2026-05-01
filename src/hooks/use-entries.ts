import { useState, useEffect } from "react";
import { JournalEntry, mockEntries } from "@/lib/mock-data";

const STORAGE_KEY = "mindtrace_entries";

// Helper to broadcast changes between tabs/components
const broadcastChange = () => {
  window.dispatchEvent(new Event("entries-updated"));
};

export const useEntries = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse entries", e);
        setEntries(mockEntries);
      }
    } else {
      // Initialize with mock data if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEntries));
      setEntries(mockEntries);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEntries();

    const handleUpdate = () => loadEntries();
    window.addEventListener("entries-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("entries-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const addEntry = (entry: Omit<JournalEntry, "id" | "date">) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Math.random().toString(36).substring(2, 11),
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [newEntry, ...entries];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEntries(updated);
    broadcastChange();
    return newEntry;
  };

  const getEntryById = (id: string) => {
    return entries.find((e) => e.id === id);
  };

  return { entries, loading, addEntry, getEntryById };
};
