import { useEffect, useRef, useState } from "react";
import { downloadText, resources } from "../course";
import { useStoredState } from "../lib";
import type { FieldNote } from "../lib";
import { Eyebrow, Icon } from "./Icons";

type NotebookProps = {
  notes: FieldNote[];
  saved: string[];
  close: () => void;
  onSave: (text: string, source: string, id?: string) => void;
  onDelete: (id: string) => void;
  onBookmark: (id: string) => void;
  notify: (message: string) => void;
};

export function Notebook({
  notes,
  saved,
  close,
  onSave,
  onDelete,
  onBookmark,
  notify,
}: NotebookProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [tab, setTab] = useState<"notes" | "saved">("notes");
  const [draft, setDraft] = useStoredState("notebook-draft", "");
  const [editId, setEditId] = useStoredState<string | null>(
    "notebook-editing",
    null,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  const exportNotes = () => {
    const bookmarkText = resources
      .filter((r) => saved.includes(r.id))
      .map((r) => `${r.title}\n${r.description}\n${r.url}`)
      .join("\n\n");
    downloadText(
      "My-Fieldwork-Notebook.txt",
      `FIELDWORK / MY NOTEBOOK\nAI Foundations\n\nFIELD NOTES\n${notes.map((n) => `${n.source}\n${new Date(n.created).toLocaleDateString()}\n${n.text}`).join("\n\n") || "No notes yet."}\n\nSAVED RESOURCES\n${bookmarkText || "No saved resources yet."}`,
    );
    notify("Your notebook has been exported as a text file.");
  };
  return (
    <dialog
      ref={ref}
      className="notebook-dialog"
      aria-labelledby="notebook-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === ref.current) {
          const bounds = ref.current!.getBoundingClientRect();
          if (
            e.clientX < bounds.left ||
            e.clientX > bounds.right ||
            e.clientY < bounds.top ||
            e.clientY > bounds.bottom
          )
            close();
        }
      }}
    >
      <div className="notebook-inner">
        <div className="notebook-top">
          <Eyebrow>
            <Icon name="notebook" size={15} />
            Your workspace
          </Eyebrow>
          <button
            className="icon-button"
            aria-label="Close notebook"
            onClick={close}
          >
            <Icon name="close" size={21} />
          </button>
        </div>
        <h2 id="notebook-title">My notebook</h2>
        <p className="notebook-intro">
          Your ideas and references, kept in one place.
        </p>
        <div className="notebook-tabs">
          <button
            className={tab === "notes" ? "active" : ""}
            aria-pressed={tab === "notes"}
            onClick={() => setTab("notes")}
          >
            Field notes <span>{notes.length}</span>
          </button>
          <button
            className={tab === "saved" ? "active" : ""}
            aria-pressed={tab === "saved"}
            onClick={() => setTab("saved")}
          >
            Saved resources <span>{saved.length}</span>
          </button>
        </div>
        {tab === "notes" ? (
          <div className="reveal">
            <form
              className="new-note"
              onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim()) return;
                const previous = notes.find((n) => n.id === editId);
                onSave(
                  draft.trim(),
                  previous?.source || "Personal field note",
                  editId || undefined,
                );
                setDraft("");
                setEditId(null);
              }}
            >
              <label className="eyebrow" htmlFor="notebook-draft">
                <Icon name="pencil" size={13} />
                {editId ? "Edit field note" : "New field note"}
              </label>
              <textarea
                id="notebook-draft"
                ref={textRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="An idea, a question, something to remember..."
                rows={4}
                maxLength={12000}
              />
              <div className="note-form-actions">
                {editId && (
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => {
                      setEditId(null);
                      setDraft("");
                    }}
                  >
                    Cancel edit
                  </button>
                )}
                <button
                  className="button button-primary button-small"
                  type="submit"
                  disabled={!draft.trim()}
                >
                  {editId ? "Save changes" : "Save note"}
                  <Icon name="check" size={14} />
                </button>
              </div>
            </form>
            <div className="saved-notes">
              <Eyebrow>Your field notes</Eyebrow>
              {notes.length === 0 ? (
                <p className="empty-message">
                  A fresh page. Add your first note above, or save a reflection
                  from a module exercise.
                </p>
              ) : (
                notes.map((note) => (
                  <article className="saved-note" key={note.id}>
                    <div className="note-meta">
                      <span>{note.source}</span>
                      <time dateTime={note.created}>
                        {new Date(note.created).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <p>{note.text}</p>
                    {deleteId === note.id ? (
                      <div className="delete-confirm">
                        <span>Delete this note?</span>
                        <button onClick={() => setDeleteId(null)}>Keep</button>
                        <button
                          className="danger"
                          onClick={() => {
                            onDelete(note.id);
                            setDeleteId(null);
                            if (editId === note.id) {
                              setEditId(null);
                              setDraft("");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="note-tools">
                        <button
                          aria-label={`Edit note: ${note.text.slice(0, 36)}`}
                          onClick={() => {
                            setEditId(note.id);
                            setDraft(note.text);
                            textRef.current?.focus();
                            textRef.current?.scrollIntoView({
                              block: "center",
                            });
                          }}
                        >
                          <Icon name="pencil" size={14} />
                          Edit
                        </button>
                        <button
                          aria-label={`Delete note: ${note.text.slice(0, 36)}`}
                          onClick={() => setDeleteId(note.id)}
                        >
                          <Icon name="trash" size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="saved-resource-list reveal">
            {saved.length === 0 ? (
              <>
                <Icon name="bookmark" size={28} />
                <h3>Your reference collection</h3>
                <p className="empty-message">
                  Bookmark a tool or reading from the resource library to find
                  it here.
                </p>
                <a href="#resources" className="text-link" onClick={close}>
                  Explore the library
                  <Icon name="arrow" size={15} />
                </a>
              </>
            ) : (
              resources
                .filter((r) => saved.includes(r.id))
                .map((r) => (
                  <article key={r.id}>
                    <div className="micro">{r.category}</div>
                    <h3>
                      <a href={r.url} target="_blank" rel="noreferrer">
                        {r.title}
                        <Icon name="external" size={14} />
                      </a>
                    </h3>
                    <p>{r.description}</p>
                    <button
                      onClick={() => onBookmark(r.id)}
                      className="text-link remove-bookmark"
                    >
                      <Icon name="bookmark" size={13} />
                      Remove bookmark
                    </button>
                  </article>
                ))
            )}
          </div>
        )}
        <div className="notebook-bottom">
          <p>
            Saved on this device, in this browser. Export a copy to keep your
            work.
          </p>
          <button
            className="button button-outline button-small"
            disabled={notes.length + saved.length === 0}
            onClick={exportNotes}
          >
            <Icon name="download" size={15} />
            Export notebook
          </button>
        </div>
      </div>
    </dialog>
  );
}
