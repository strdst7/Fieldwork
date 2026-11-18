import { useCallback, useEffect, useRef, useState } from "react";
import { courseModules } from "./course";
import { useRoute, useStoredState, pad } from "./lib";
import type { FieldNote } from "./lib";
import { Brand, Icon } from "./components/Icons";
import { Curriculum, Overview, Progress } from "./components/Course";
import { LessonReader } from "./components/LessonReader";
import { ResourceLibrary } from "./components/ResourceLibrary";
import { Notebook } from "./components/Notebook";

export default function App() {
  const route = useRoute();
  const [completed, setCompleted] = useStoredState<number[]>("completed", []);
  const [lastModule, setLastModule] = useStoredState("last-module", 0);
  const [notes, setNotes] = useStoredState<FieldNote[]>("notes", []);
  const [saved, setSaved] = useStoredState<string[]>("resources", []);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const activeModule = courseModules[route.moduleId - 1];
  const nextModule =
    lastModule > 0 && !completed.includes(lastModule)
      ? lastModule
      : courseModules.find((m) => !completed.includes(m.id))?.id || 1;
  const notify = useCallback((message: string) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 3500);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  useEffect(() => {
    setMenuOpen(false);
    if (route.page === "module") setLastModule(route.moduleId);
    const pageTitle =
      route.page === "module"
        ? activeModule.title
        : {
            overview: "AI Foundations",
            curriculum: "Course curriculum",
            resources: "Resource library",
            progress: "Your progress",
          }[route.page];
    document.title = `${pageTitle} | Fieldwork`;
  }, [route, activeModule, setLastModule]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  const saveNote = (text: string, source: string, id?: string) => {
    const note: FieldNote = {
      id:
        id ||
        globalThis.crypto?.randomUUID?.() ||
        `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      text,
      source,
      created: new Date().toISOString(),
    };
    setNotes((previous) => [note, ...previous.filter((n) => n.id !== note.id)]);
    notify("Field note saved to your notebook.");
  };
  const toggleResource = (id: string) => {
    const exists = saved.includes(id);
    setSaved((previous) =>
      exists ? previous.filter((item) => item !== id) : [...previous, id],
    );
    notify(
      exists
        ? "Resource removed from your notebook."
        : "Resource saved to your notebook.",
    );
  };
  const completeModule = (id: number) => {
    const updated = Array.from(new Set([...completed, id]));
    setCompleted(updated);
    const next =
      courseModules.find((m) => m.id > id && !updated.includes(m.id)) ||
      courseModules.find((m) => !updated.includes(m.id));
    window.location.hash = next ? `module/${next.id}` : "progress";
    notify(
      next
        ? `Module ${pad(id)} complete. Your progress is saved.`
        : "All six modules complete. Well learned!",
    );
  };
  const nav = [
    { id: "overview", label: "Course overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "resources", label: "Resources" },
  ];
  const currentTab = ["module", "progress"].includes(route.page)
    ? "curriculum"
    : route.page;
  return (
    <div className="app-shell">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-width header-inner">
          <a
            href="#overview"
            className="brand-link"
            aria-label="Fieldwork course overview"
            onClick={() => {
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
          >
            <Brand />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={currentTab === link.id ? "active" : ""}
                aria-current={currentTab === link.id ? "page" : undefined}
                onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="notebook-button"
              aria-haspopup="dialog"
              onClick={() => {
                setNotebookOpen(true);
                setMenuOpen(false);
              }}
            >
              <Icon name="notebook" size={17} />
              My notebook
            </button>
            <button
              className="mobile-menu icon-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {nav.map((link) => (
              <a
                href={`#${link.id}`}
                key={link.id}
                className={currentTab === link.id ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                <Icon name="arrow" size={16} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main-content" tabIndex={-1}>
        {route.page === "overview" && (
          <Overview
            completed={completed}
            notify={notify}
            nextModule={nextModule}
            started={lastModule > 0}
          />
        )}
        {route.page === "curriculum" && (
          <Curriculum completed={completed} notify={notify} />
        )}
        {route.page === "resources" && (
          <ResourceLibrary saved={saved} onSave={toggleResource} />
        )}
        {route.page === "module" && (
          <LessonReader
            key={route.moduleId}
            module={activeModule}
            completed={completed}
            savedNote={notes.find(
              (n) => n.id === `module-${route.moduleId}-reflection`,
            )}
            saveNote={saveNote}
            complete={completeModule}
          />
        )}
        {route.page === "progress" && (
          <Progress
            completed={completed}
            openNotebook={() => setNotebookOpen(true)}
          />
        )}
      </main>
      <footer className="site-footer">
        <div className="site-width footer-inner">
          <a href="#overview" aria-label="Fieldwork home">
            <Brand small />
          </a>
          <span className="micro">A field guide for curious minds</span>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            Back to top
            <Icon name="up" size={14} />
          </button>
        </div>
      </footer>
      {notebookOpen && (
        <Notebook
          notes={notes}
          saved={saved}
          close={() => setNotebookOpen(false)}
          onSave={saveNote}
          onDelete={(id) => {
            setNotes((previous) => previous.filter((n) => n.id !== id));
            notify("Field note deleted.");
          }}
          onBookmark={toggleResource}
          notify={notify}
        />
      )}
      <div className="toast-region" role="status" aria-live="polite">
        {toast && (
          <div className="toast">
            <Icon name="check" size={15} />
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
