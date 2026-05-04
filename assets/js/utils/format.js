// utils/format.js - Date formatting and string cleanup utilities

export function formatDateSafe(value) {
  if (!value || typeof value !== "string") return "Most recent";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Most recent";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

export function normalizePastor(value) {
  if (!value || typeof value !== "string") return "FLC Team";
  const clean = value.replace(/\s+/g, " ").trim();
  return clean || "FLC Team";
}

export function removeSkeleton(el) {
  if (!el) return;
  el.classList.remove('skeleton');
}
