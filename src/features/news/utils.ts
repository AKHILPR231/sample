/**
 * Date/time helpers for the News feature.
 *
 * Hand-rolled rather than relying on Intl/toLocale* so output is stable across
 * Hermes builds and locales. All input is the EventDocument ISO `*_datetime`.
 */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_SHORT = MONTHS.map((m) => m.slice(0, 3));

function parse(iso?: string): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** "1 July 2026" */
export function formatDate(iso?: string): string {
  const d = parse(iso);
  if (!d) return "";
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** "1 Jul 2026" — compact variant for cards. */
export function formatDateShort(iso?: string): string {
  const d = parse(iso);
  if (!d) return "";
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

/** "10:00 AM" */
export function formatTime(iso?: string): string {
  const d = parse(iso);
  if (!d) return "";
  const hours = d.getHours();
  const mins = d.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${h12}:${mins} ${period}`;
}

/**
 * Compact date range for related/list rows.
 * Same day → "1 Jul 2026"; across days → "1 – 3 Jul 2026" / "30 Jun – 2 Jul 2026".
 */
export function formatDateRange(startIso?: string, endIso?: string): string {
  const start = parse(startIso);
  if (!start) return "";
  const end = parse(endIso);
  if (!end || isSameDay(start, end)) return formatDateShort(startIso);

  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    return `${start.getDate()} – ${end.getDate()} ${MONTHS_SHORT[end.getMonth()]} ${end.getFullYear()}`;
  }
  return `${start.getDate()} ${MONTHS_SHORT[start.getMonth()]} – ${end.getDate()} ${MONTHS_SHORT[end.getMonth()]} ${end.getFullYear()}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}
