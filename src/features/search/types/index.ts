/** The kinds of results the search screen can surface. */
export type SearchResultType = "store" | "movie" | "event" | "dining";

/**
 * Normalized, UI-facing shape. Stores and events from the DB are mapped into
 * this so the list renders uniformly regardless of source collection.
 */
export type SearchResult = {
  id: string;
  title: string;
  imageUrl?: string;
  type: SearchResultType;
  /** Middle breadcrumb segment, e.g. "Fashion", "Animation". */
  category: string;
  /** Trailing breadcrumb segment, e.g. "Block A", "2nd Floor". */
  location: string;
};
