import useSWR from "swr";

// Define the Entry type
export type Entry = {
  id: string;
  title: string;
  abstract?: string;
};

// SWR fetcher function
const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

// Fetch all entries
export const useEntries = () => {
  return useSWR<Entry[]>("/api/entries", fetcher);
};

// Create a new entry
export const createEntry = async (entry: Omit<Entry, "id">) => {
  const res = await fetch("/api/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to create entry");
  }
};

// Delete an entry
export const deleteEntry = async (id: string) => {
  const res = await fetch(`/api/entries/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to delete entry");
  }
};
