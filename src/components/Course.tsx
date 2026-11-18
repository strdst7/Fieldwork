import { useState } from "react";
import { audience, courseModules, courseObjective } from "../course";
import { pad } from "../lib";
import { Eyebrow, Icon } from "./Icons";

type CourseProps = { completed: number[]; notify: (message: string) => void };

export function SyllabusButton({ notify }: { notify: CourseProps["notify"] }) {
  return (
    <a
      className="syllabus-button"
      href="/AI-Foundations-Course-Guide.pdf"
      download="Fieldwork-AI-Foundations-Syllabus.pdf"
      title="Download the complete 10-page course guide (PDF)"
      onClick={() => notify("Your printable syllabus download has started.")}
    >
      <Icon name="download" size={16} />
      Download syllabus
      <Icon name="arrow" size={16} />
    </a>
  );
}

function CourseBrief({ notify }: { notify: CourseProps["notify"] }) {
  return (
    <aside className="overview-aside">
      <div className="course-brief">
        <div className="paper-fold" aria-hidden="true" />
        <Eyebrow>
          <Icon name="file" size={14} /> Course brief
        </Eyebrow>
        <h3>At a glance</h3>
        <dl className="brief-rows">
          {[
            ["level", "Level", "Complete beginner"],
            ["layers", "Structure", "6 modules"],
            ["clock", "Duration", "6 hours total"],
            ["monitor", "Format", "Self-paced"],
          ].map(([icon, label, value]) => (
            <div key={label}>
              <dt>
                <Icon name={icon} size={16} />
                {label}
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <SyllabusButton notify={notify} />
      </div>
      <div className="audience-note">
        <Eyebrow>Who it's for</Eyebrow>
        <h3>Curiosity is enough.</h3>
        <p>{audience}</p>
      </div>
    </aside>
  );
}

export function ModuleList({
  completed,
  detailed = false,
}: {
  completed: number[];
  detailed?: boolean;
}) {
  const [expanded, setExpanded] = useState<number | null>(detailed ? 1 : null);
  return (
    <div className="module-list">
      {courseModules.map((module) => {
        const open = expanded === module.id;
        return (
          <article
            className={`module-row ${open ? "is-expanded" : ""}`}
            key={module.id}
          >
            <h3>
              <button
                className="module-toggle"
                aria-expanded={open}
                aria-controls={`outline-${module.id}`}
                onClick={() => setExpanded(open ? null : module.id)}
              >
                <span className="module-index">{pad(module.id)}</span>
                <span className="module-preview">
                  <span className="module-title">{module.title}</span>
                  <span className="module-summary">{module.summary}</span>
                </span>
                {completed.includes(module.id) && (
                  <span className="row-complete" title="Module completed">
                    <Icon name="check" size={16} />
                    <span className="sr-only">Completed</span>
                  </span>
                )}
                <span className="expand-mark">
                  <Icon name={open ? "minus" : "plus"} size={18} />
                </span>
              </button>
            </h3>
            {open && (
              <div
                className="module-details reveal"
                id={`outline-${module.id}`}
              >
                <div className="detail-meta">
                  <span>{module.theme}</span>
                  <span>
                    <Icon name="clock" size={13} />
                    {module.minutes} min
                  </span>
                </div>
                <p className="module-outcome">{module.outcome}</p>
                <h4>What you'll explore</h4>
                <ul className="topic-list">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.title}>{lesson.title}</li>
                  ))}
                </ul>
                <p className="activity-preview">
                  <Icon name="pencil" size={15} />
                  <span>
                    <strong>Field exercise:</strong> {module.activity.title}
                  </span>
                </p>
                <a className="text-link" href={`#module/${module.id}`}>
                  {completed.includes(module.id)
                    ? "Revisit module"
                    : "Open module"}
                  <Icon name="arrow" size={16} />
                </a>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function LearningOutcomes() {
  return (
    <section className="outcomes-section">
      <div className="site-width outcomes-layout">
        <div>
          <Eyebrow>02 / Learning outcomes</Eyebrow>
          <h2>What you'll take away</h2>
          <p>Useful skills, not just new terminology.</p>
        </div>
        <ul className="outcome-list">
          {courseModules.map((m) => (
            <li key={m.id}>
              <span>
                <Icon name="check" size={14} />
              </span>
              {m.outcome}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Overview({
  completed,
  notify,
  nextModule,
  started,
}: CourseProps & { nextModule: number; started: boolean }) {
  return (
    <>
      <section className="hero" aria-labelledby="course-title">
        <div className="site-width hero-layout">
          <div className="hero-copy">
            <Eyebrow line>
              Field guide <span className="eyebrow-slash">/</span> No. 001
            </Eyebrow>
            <h1 id="course-title">AI Foundations</h1>
            <p className="hero-subtitle">A field guide for beginners.</p>
            <p className="hero-description">
              A practical introduction to artificial intelligence. Understand
              the big ideas, explore real-world uses, and learn to use AI with
              confidence.
            </p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href={
                  completed.length === 6 ? "#progress" : `#module/${nextModule}`
                }
              >
                {completed.length === 6
                  ? "View your progress"
                  : started
                    ? "Continue learning"
                    : "Start learning"}
                <Icon name="arrow" size={18} />
              </a>
              <button
                className="quiet-button"
                onClick={() =>
                  document
                    .getElementById("course-outline")
                    ?.scrollIntoView({
                      behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches
                        ? "instant"
                        : "smooth",
                      block: "start",
                    })
                }
              >
                Explore curriculum
                <Icon name="down" size={15} />
              </button>
            </div>
          </div>
          <figure className="hero-art">
            <img
              src="/images/computer-study.webp"
              width="1440"
              height="960"
              fetchPriority="high"
              alt="A cobalt-blue technical engraving of a vintage personal computer displaying a wireframe globe, with keyboard and mouse."
            />
            <figcaption>
              <span>Fig. 01</span>
              <i />
              The personal computer
            </figcaption>
          </figure>
        </div>
        <div className="hero-register site-width" aria-hidden="true">
          <i />
          <i />
        </div>
      </section>
      <section id="course-outline" className="site-width course-layout">
        <div className="curriculum-main">
          <Eyebrow>01 / The curriculum</Eyebrow>
          <div className="section-heading">
            <h2>Your learning path</h2>
            <span className="module-count">06 modules</span>
          </div>
          <p className="section-intro">
            Six thoughtful modules, from the fundamentals to your first AI
            project.
          </p>
          <ModuleList completed={completed} />
        </div>
        <CourseBrief notify={notify} />
      </section>
      <LearningOutcomes />
      <section className="site-width next-section">
        <div>
          <Eyebrow>03 / Keep exploring</Eyebrow>
          <h2>Your reference shelf</h2>
          <p>
            Trusted tools, a plain-language glossary, and a few good places to
            go next.
          </p>
        </div>
        <a className="button button-outline" href="#resources">
          Browse resources
          <Icon name="arrow" size={17} />
        </a>
      </section>
    </>
  );
}

export function Curriculum({ completed, notify }: CourseProps) {
  return (
    <div className="page-enter">
      <div className="page-intro site-width">
        <Eyebrow line>Field guide no. 001 / Curriculum</Eyebrow>
        <h1>Your learning path</h1>
        <p>{courseObjective}</p>
      </div>
      <section className="site-width course-layout curriculum-layout">
        <div>
          <div className="list-heading">
            <Eyebrow>Module index</Eyebrow>
            <span className="micro">06 modules / 06 hours</span>
          </div>
          <ModuleList completed={completed} detailed />
        </div>
        <aside className="rhythm-aside">
          <Eyebrow>Suggested pace</Eyebrow>
          <h2>A three-week rhythm</h2>
          <p>
            Set aside about two hours a week, or follow your own pace. Time
            estimates include the exercises.
          </p>
          <ol className="week-list">
            {[
              ["Build a foundation", "Modules 01 & 02", 1],
              ["Explore the possibilities", "Modules 03 & 04", 3],
              ["Put it into practice", "Modules 05 & 06", 5],
            ].map(([title, range, first], i) => (
              <li key={i}>
                <span className="micro">Week {pad(i + 1)}</span>
                <a href={`#module/${first}`}>
                  <span>{title}</span>
                  <Icon name="external" size={14} />
                </a>
                <small>{range}</small>
              </li>
            ))}
          </ol>
          <SyllabusButton notify={notify} />
        </aside>
      </section>
      <LearningOutcomes />
    </div>
  );
}

export function Progress({
  completed,
  openNotebook,
}: {
  completed: number[];
  openNotebook: () => void;
}) {
  const done = completed.length === 6;
  const next = courseModules.find((m) => !completed.includes(m.id))?.id || 1;
  return (
    <div className="site-width progress-page page-enter">
      <Eyebrow line>Field guide no. 001 / Your progress</Eyebrow>
      <h1>{done ? "A strong foundation." : "Your course progress."}</h1>
      <p className="lead">
        {done
          ? "You have finished all six modules of AI Foundations. Now put one useful idea into practice."
          : "Every module is a step forward. Pick up where you left off."}
      </p>
      <div className="progress-summary">
        <span className="micro">
          {pad(completed.length)} / 06 modules complete
        </span>
        <div className="progress-track">
          <i style={{ width: `${(completed.length / 6) * 100}%` }} />
        </div>
      </div>
      <div className="progress-list">
        {courseModules.map((m) => (
          <a href={`#module/${m.id}`} key={m.id}>
            <span className="micro">{pad(m.id)}</span>
            <span>{m.title}</span>
            {completed.includes(m.id) ? (
              <span className="completed-text">
                <Icon name="check" size={15} />
                Complete
              </span>
            ) : (
              <Icon name="arrow" size={16} />
            )}
          </a>
        ))}
      </div>
      <h2>{done ? "Your next seven days" : "Keep your learning close"}</h2>
      <p>
        {done
          ? "Choose one low-risk task, compare an AI-assisted result with your usual approach, and ask a person to review it. Record what worked, what did not, and whether you will continue."
          : "Your reflections and saved resources are collected in your notebook on this device."}
      </p>
      <div className="action-row">
        <a
          className="button button-primary"
          href={done ? "#resources" : `#module/${next}`}
        >
          {done ? "Explore further learning" : "Continue learning"}
          <Icon name="arrow" size={16} />
        </a>
        <button className="button button-outline" onClick={openNotebook}>
          <Icon name="notebook" size={16} />
          My notebook
        </button>
      </div>
    </div>
  );
}
