import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStoredNotes, storeNotes } from "~/data/notes";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import NewNotes, { links as newNoteLinks } from "../components/NewNotes";

/**
 *
 * @returns
 */
export const loader = async () => {
  const notes = await getStoredNotes();
  // return new Response(JSON.stringify(notes), {headers: {"Content-Type": "application/json"}});
  // return json(notes)
  return notes;
};

/**
 *
 * @param {*} data
 */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // Add validation...
  const existingNptes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...existingNptes, noteData];
  await storeNotes(updatedNotes);

  return redirect("/notes");
};

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNotes />
      <NoteList notes={notes} />
    </main>
  );
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
