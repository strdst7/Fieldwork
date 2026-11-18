import { useEffect, useState } from "react";

export type FieldNote = {
  id: string;
  text: string;
  source: string;
  created: string;
};
export type Route = {
  page: "overview" | "curriculum" | "resources" | "module" | "progress";
  moduleId: number;
};
export const pad = (value: number) => String(value).padStart(2, "0");

export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(`fieldwork:${key}`);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(`fieldwork:${key}`, JSON.stringify(value));
    } catch {
      /* Keep the current session usable if browser storage is unavailable. */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

function readRoute(): Route {
  const hash = window.location.hash.slice(1);
  const lesson = /^module\/([1-6])$/.exec(hash);
  if (lesson) return { page: "module", moduleId: Number(lesson[1]) };
  if (hash === "curriculum" || hash === "resources" || hash === "progress")
    return { page: hash, moduleId: 1 };
  return { page: "overview", moduleId: 1 };
}

export function useRoute() {
  const [route, setRoute] = useState<Route>(readRoute);
  useEffect(() => {
    const handleHash = () => setRoute(readRoute());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);
  return route;
}
