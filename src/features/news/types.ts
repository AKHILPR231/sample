import type { EventDocument } from "@/schemas";

/**
 * A news article. The News feature treats each EventDocument as an article,
 * so this is a direct alias — kept as a named type so call sites read as
 * "news" rather than "event", and so the mapping lives in one place.
 */
export type NewsArticle = EventDocument;
