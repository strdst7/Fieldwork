import type { CSSProperties, ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  arrow: (
    <>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </>
  ),
  back: (
    <>
      <path d="M20 12H5m6-6-6 6 6 6" />
    </>
  ),
  down: (
    <>
      <path d="M12 4v15m-6-6 6 6 6-6" />
    </>
  ),
  up: (
    <>
      <path d="M12 20V5m-6 6 6-6 6 6" />
    </>
  ),
  external: (
    <>
      <path d="M5 19 19 5M6 5h13v13" />
    </>
  ),
  bookmark: (
    <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4z" />
  ),
  notebook: (
    <>
      <path d="M6 3h12a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 18 21H6a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 6 3Z" />
      <path d="M8 3v18m4-18v7l2-1.5 2 1.5V3" />
    </>
  ),
  book: (
    <>
      <path d="M3 4.5c3.5-1.1 6.5-.5 9 1.5 2.5-2 5.5-2.6 9-1.5v14c-3.5-1.1-6.5-.5-9 1.5-2.5-2-5.5-2.6-9-1.5zM12 6v14" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M7.5 3v5m9-5v5m-13 3h17M8 15h2m4 0h2" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="3.5" width="19" height="14" rx="2" />
      <path d="M8 21h8m-4-3.5V21" />
    </>
  ),
  level: (
    <>
      <path d="M4 20v-5h3v5zm6.5 0V9h3v11zm6.5 0V4h3v16z" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  chevron: <path d="m5 9 7 7 7-7" />,
  check: <path d="m4.5 12 5 5 10-11" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  download: (
    <>
      <path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" />
    </>
  ),
  pencil: (
    <>
      <path d="m14.5 5.5 4 4M4 20l4.5-1 12-12a2.9 2.9 0 0 0-4-4l-12 12z" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18m-14 0 1 15h8l1-15M9 6V3h6v3m-5 4v7m4-7v7" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V3m0 1c5-4 9 4 15 0v10c-6 4-10-4-15 0" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  file: (
    <>
      <path d="M5 3h10l4 4v14H5zm10 0v5h4M8 12h8m-8 4h6" />
    </>
  ),
  map: (
    <>
      <path d="m3 5 6-2 6 3 6-2v15l-6 2-6-3-6 2zm6-2v15m6-12v15" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2.5 5.5L8 16l2.5-5.5z" />
    </>
  ),
  clip: (
    <>
      <path d="m8 13 6.5-6.5a2 2 0 0 1 3 3l-9 9a4 4 0 0 1-5.5-5.7L13 3a5.5 5.5 0 0 1 7.8 7.8L11 20.5" />
    </>
  ),
};

export function Icon({
  name,
  size = 18,
  className = "",
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {paths[name]}
    </svg>
  );
}

export function Brand({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand ${small ? "brand-small" : ""}`}>
      <svg
        aria-hidden="true"
        className="brand-mark"
        viewBox="0 0 40 38"
        fill="none"
      >
        <path d="m3 9 15 5.5v19L3 27.5V9Z" fill="currentColor" />
        <path d="m21 14.5 15-5.8V27l-15 6.5v-19Z" fill="currentColor" />
        <path
          d="m6 4.5 12 4.8v3L6 7.5v-3Zm15 4.8 12-5v3.2l-12 4.8v-3Z"
          fill="currentColor"
        />
        <path
          d="m10 1 8 3.2v2.5l-8-3V1Zm11 3.2L29 1v2.7l-8 3V4.2Z"
          fill="currentColor"
        />
      </svg>
      <span>Fieldwork</span>
    </span>
  );
}

export function Eyebrow({
  children,
  line = false,
}: {
  children: ReactNode;
  line?: boolean;
}) {
  return (
    <div className={`eyebrow ${line ? "eyebrow-line" : ""}`}>{children}</div>
  );
}
