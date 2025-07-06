import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { createEntry, deleteEntry, useEntries } from "../api"; // Adjust as you build this
import { Entry } from "../types"; // Assume Entry type exists or add it

export const EntryList: React.FC = () => {
  const { data: entries, error } = useEntries(); // Replace with your hook

  if (error != null) return <div>Error loading entries...</div>;
  if (entries == null) return <div>Loading...</div>;

  if (entries.length === 0) {
    return <div className={styles.emptyState}>No entries yet.</div>;
  }

  return (
    <ul className={styles.todoList}>
      {entries.map(entry => (
        <EntryItem entry={entry} key={entry.id} />
      ))}
    </ul>
  );
};

const EntryItem: React.FC<{ entry: Entry }> = ({ entry }) => (
  <li className={styles.todo}>
    <div className={styles.label}>
      <strong>{entry.title}</strong><br />
      <small>{entry.abstract || "No abstract available"}</small>
    </div>
    <button className={styles.deleteButton} onClick={() => deleteEntry(entry.id)}>
      ✕
    </button>
  </li>
);

const AddEntryForm = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        await createEntry({ title, abstract });
        setTitle("");
        setAbstract("");
      }}
      className={styles.addTodo}
    >
      <input
        className={styles.input}
        placeholder="Entry Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Abstract (optional)"
        value={abstract}
        onChange={e => setAbstract(e.target.value)}
      />
      <button className={styles.addButton}>Add Entry</button>
    </form>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bibliography Tagger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>📚 Bibliography Tagger</h1>
        <h2 className={styles.desc}>
          Classify and tag entries collaboratively. Built with Next.js, Prisma, and Railway.
        </h2>
      </header>

      <main className={styles.main}>
        <AddEntryForm />
        <EntryList />
      </main>
    </div>
  );
};

export default Home;
