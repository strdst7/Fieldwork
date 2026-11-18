import { useMemo, useState } from "react";
import { glossary, resources } from "../course";
import type { ResourceCategory } from "../course";
import { Eyebrow, Icon } from "./Icons";
import { pad } from "../lib";

const categories: ("All resources" | ResourceCategory)[] = [
  "All resources",
  "AI tools",
  "Frameworks",
  "Further learning",
];

export function ResourceLibrary({
  saved,
  onSave,
}: {
  saved: string[];
  onSave: (id: string) => void;
}) {
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All resources");
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      resources.filter(
        (r) =>
          (category === "All resources" || r.category === category) &&
          `${r.title} ${r.provider} ${r.description}`
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
      ),
    [category, search],
  );
  return (
    <div className="site-width resource-page page-enter">
      <div className="page-intro">
        <Eyebrow line>Field guide no. 001 / Resources</Eyebrow>
        <h1>The reference shelf</h1>
        <p>
          A considered collection of tools, further reading, and next steps.
          Save the useful ones to your notebook.
        </p>
      </div>
      <div className="resource-toolbar">
        <div className="filter-tabs" aria-label="Resource categories">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "active" : ""}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search-input">
          <Icon name="search" size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find a resource"
            aria-label="Find a resource"
          />
          {search && (
            <button
              className="icon-button"
              aria-label="Clear search"
              onClick={() => setSearch("")}
            >
              <Icon name="close" size={14} />
            </button>
          )}
        </label>
      </div>
      <div className="resource-result-count micro" aria-live="polite">
        {pad(filtered.length)}{" "}
        {filtered.length === 1 ? "resource" : "resources"}
      </div>
      <div className="resource-list">
        {filtered.map((r) => (
          <article className="resource-row" key={r.id}>
            <div className="resource-symbol">
              <Icon
                name={
                  r.category === "AI tools"
                    ? "compass"
                    : r.category === "Frameworks"
                      ? "layers"
                      : "book"
                }
                size={24}
              />
            </div>
            <div className="resource-copy">
              <div className="micro">
                {r.category} <span>/</span> {r.provider}
              </div>
              <h2>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.title}
                  <Icon name="external" size={16} />
                </a>
              </h2>
              <p>{r.description}</p>
            </div>
            <button
              className={`save-resource ${saved.includes(r.id) ? "is-saved" : ""}`}
              onClick={() => onSave(r.id)}
              aria-pressed={saved.includes(r.id)}
              aria-label={`${saved.includes(r.id) ? "Unsave" : "Save"} ${r.title}`}
            >
              <Icon name="bookmark" size={19} />
              <span>{saved.includes(r.id) ? "Saved" : "Save"}</span>
            </button>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-search">
          <Icon name="search" size={28} />
          <h2>No matching resources</h2>
          <p>Try a different search term or choose another category.</p>
          <button
            className="text-link"
            onClick={() => {
              setSearch("");
              setCategory("All resources");
            }}
          >
            Show all resources
            <Icon name="arrow" size={15} />
          </button>
        </div>
      )}
      <section className="glossary-section">
        <div>
          <Eyebrow>Quick reference</Eyebrow>
          <h2>A little glossary</h2>
          <p>Big ideas, in everyday language.</p>
        </div>
        <div className="glossary-list">
          {glossary.map(([term, meaning]) => (
            <details key={term}>
              <summary>
                {term}
                <Icon name="plus" size={16} />
              </summary>
              <p>{meaning}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="resource-footnote">
        <Icon name="book" size={17} />
        <p>
          External tools are optional and may have account requirements or paid
          plans. Every Fieldwork exercise also has a no-account, on-paper
          option.
        </p>
      </div>
    </div>
  );
}
