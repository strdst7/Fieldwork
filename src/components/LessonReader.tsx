import { useRef, useState } from "react";
import { courseModules } from "../course";
import type { CourseModule } from "../course";
import { pad, useStoredState } from "../lib";
import type { FieldNote } from "../lib";
import { Eyebrow, Icon } from "./Icons";

type Stage = "Read" | "Field exercise" | "Quick check";

export function LessonReader({
  module,
  completed,
  savedNote,
  saveNote,
  complete,
}: {
  module: CourseModule;
  completed: number[];
  savedNote?: FieldNote;
  saveNote: (text: string, source: string, id?: string) => void;
  complete: (id: number) => void;
}) {
  const [stage, setStage] = useStoredState<Stage>(`stage-${module.id}`, "Read");
  const [draft, setDraft] = useStoredState(
    `reflection-${module.id}`,
    savedNote?.text || "",
  );
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const stageTop = useRef<HTMLDivElement>(null);
  const isCorrect = checked && choice === module.quiz.answer;
  const saved = Boolean(savedNote && savedNote.text === draft.trim());
  const changeStage = (next: Stage) => {
    setStage(next);
    if (stageTop.current && stageTop.current.getBoundingClientRect().top < 0)
      stageTop.current.scrollIntoView({ block: "start", behavior: "instant" });
  };
  return (
    <div className="site-width reader-page page-enter">
      <div className="reader-topbar">
        <a className="back-link" href="#curriculum">
          <Icon name="back" size={15} />
          Back to curriculum
        </a>
        <span className="micro">Field guide no. 001</span>
      </div>
      <div className="reader-layout">
        <aside
          className={`reader-aside ${showContents ? "contents-open" : ""}`}
        >
          <button
            className="mobile-contents-toggle"
            onClick={() => setShowContents(!showContents)}
            aria-expanded={showContents}
          >
            <Icon name="layers" size={17} />
            Course contents
            <Icon name="chevron" size={15} />
          </button>
          <div className="reader-contents">
            <Eyebrow>Your learning path</Eyebrow>
            <h2>AI Foundations</h2>
            <div className="reader-progress">
              <span className="micro">
                {pad(completed.length)} of 06 complete
              </span>
              <div className="progress-track">
                <i style={{ width: `${(completed.length / 6) * 100}%` }} />
              </div>
            </div>
            <nav aria-label="Course modules">
              {courseModules.map((m) => (
                <a
                  key={m.id}
                  className={`lesson-nav-item ${m.id === module.id ? "active" : ""}`}
                  aria-current={m.id === module.id ? "page" : undefined}
                  href={`#module/${m.id}`}
                >
                  <span className="micro">{pad(m.id)}</span>
                  <span>{m.title}</span>
                  {completed.includes(m.id) && <Icon name="check" size={14} />}
                </a>
              ))}
            </nav>
            <a className="text-link progress-link" href="#progress">
              View my progress
              <Icon name="arrow" size={14} />
            </a>
          </div>
        </aside>
        <article className="reader-article">
          <div className="lesson-kicker">
            <Eyebrow>
              Module {pad(module.id)} / {module.theme}
            </Eyebrow>
            <span className="lesson-time">
              <Icon name="clock" size={14} />
              {module.minutes} min
            </span>
          </div>
          <h1>{module.title}</h1>
          <p className="reader-objective">{module.outcome}</p>
          <div ref={stageTop} className="stage-anchor">
            <div className="reader-tabs" aria-label="Module sections">
              {(["Read", "Field exercise", "Quick check"] as Stage[]).map(
                (s, i) => (
                  <button
                    key={s}
                    onClick={() => changeStage(s)}
                    className={stage === s ? "active" : ""}
                    aria-pressed={stage === s}
                  >
                    <span>{pad(i + 1)}</span>
                    {s}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="stage-content reveal" key={stage}>
            {stage === "Read" && (
              <>
                <div className="lesson-prose">
                  {module.lessons.map((section) => (
                    <section key={section.title}>
                      <h2>{section.title}</h2>
                      <p>{section.text}</p>
                    </section>
                  ))}
                </div>
                <section className="case-study">
                  <Eyebrow>In the real world</Eyebrow>
                  <h2>{module.caseStudy.title}</h2>
                  <p>{module.caseStudy.text}</p>
                </section>
                <div className="stage-actions">
                  <span className="micro">Up next / Practice</span>
                  <button
                    className="button button-primary"
                    onClick={() => changeStage("Field exercise")}
                  >
                    Try the exercise
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
              </>
            )}
            {stage === "Field exercise" && (
              <>
                <Eyebrow>Hands-on activity</Eyebrow>
                <h2 className="stage-title">{module.activity.title}</h2>
                <p className="body-copy">{module.activity.scenario}</p>
                <ol className="exercise-steps">
                  {module.activity.steps.map((step, i) => (
                    <li key={step}>
                      <span>{pad(i + 1)}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
                <div className="reflection-box">
                  <label htmlFor="module-reflection">
                    <span className="eyebrow">
                      <Icon name="pencil" size={14} />
                      Your field note
                    </span>
                    <span>{module.activity.reflection}</span>
                  </label>
                  <textarea
                    id="module-reflection"
                    rows={5}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Capture your thinking here..."
                    maxLength={12000}
                  />
                  <div className="reflection-actions">
                    <small>Private to this browser.</small>
                    <button
                      disabled={!draft.trim() || saved}
                      className="button button-outline button-small"
                      onClick={() =>
                        saveNote(
                          draft.trim(),
                          `Module ${pad(module.id)}: ${module.title}`,
                          `module-${module.id}-reflection`,
                        )
                      }
                    >
                      <Icon name={saved ? "check" : "notebook"} size={14} />
                      {saved ? "Saved to notebook" : "Save to notebook"}
                    </button>
                  </div>
                </div>
                <div className="stage-actions">
                  <button
                    className="back-link"
                    onClick={() => changeStage("Read")}
                  >
                    <Icon name="back" size={15} />
                    Back to reading
                  </button>
                  <button
                    className="button button-primary"
                    onClick={() => changeStage("Quick check")}
                  >
                    Take the quick check
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
              </>
            )}
            {stage === "Quick check" && (
              <>
                <Eyebrow>Check your understanding</Eyebrow>
                <h2 className="stage-title">A quick check</h2>
                <p className="body-copy">
                  One question to bring the main idea into focus. You can try
                  again at any time.
                </p>
                <form
                  className="quiz-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (choice === null) return;
                    if (isCorrect) {
                      setStage("Read");
                      complete(module.id);
                    } else setChecked(true);
                  }}
                >
                  <fieldset>
                    <legend>{module.quiz.question}</legend>
                    {module.quiz.options.map((option, i) => (
                      <label
                        className={`quiz-option ${choice === i ? "selected" : ""} ${checked && choice === i ? (isCorrect ? "correct" : "incorrect") : ""}`}
                        key={option}
                      >
                        <input
                          type="radio"
                          name="module-answer"
                          checked={choice === i}
                          onChange={() => {
                            setChoice(i);
                            setChecked(false);
                          }}
                        />
                        <span className="option-letter">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{option}</span>
                        {checked && choice === i && (
                          <Icon
                            name={isCorrect ? "check" : "close"}
                            size={17}
                          />
                        )}
                      </label>
                    ))}
                  </fieldset>
                  {checked && (
                    <div
                      className={`quiz-feedback ${isCorrect ? "good" : "try-again"}`}
                      role="status"
                    >
                      <strong>
                        {isCorrect
                          ? "Exactly right."
                          : "Not quite. Try another answer."}
                      </strong>
                      <p>{module.quiz.explanation}</p>
                    </div>
                  )}
                  <div className="stage-actions">
                    <button
                      type="button"
                      className="back-link"
                      onClick={() => changeStage("Field exercise")}
                    >
                      <Icon name="back" size={15} />
                      Revisit exercise
                    </button>
                    <button
                      className="button button-primary"
                      type="submit"
                      disabled={choice === null || (checked && !isCorrect)}
                    >
                      {isCorrect ? "Complete module" : "Check my answer"}
                      <Icon name={isCorrect ? "check" : "arrow"} size={16} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
