/**
 * News feature — static configuration & copy.
 *
 * The News feature reads entirely from the existing `events` collection
 * (each EventDocument is treated as an article). Only values that do not
 * belong in the database live here: page titles and the small amount of
 * detail-screen wording that the EventDocument schema does not model.
 */

export const LIST_COPY = {
  title: "News & Events",
  subtitle: "What's on across VIA Outlets",
  emptyTitle: "Nothing to report yet",
  emptyBody: "There are no news stories or events right now. Check back soon for what's on.",
  errorTitle: "Couldn't load news",
  errorBody: "Something went wrong while loading. Pull down to try again.",
} as const;

export const DETAIL_COPY = {
  headerTitle: "Event",
  aboutTitle: "About This Event",
  dateTitle: "Date & Time",
  detailsTitle: "Event Details",
  relatedTitle: "Related Events",
  addToCalendar: "Add to Calendar",
  startsLabel: "Starts",
  endsLabel: "Ends",
  /** Shown for the venue-within-outlet line when the event has one. */
  whereLabel: "Where",
  venueLabel: "Venue",
  categoryLabel: "Category",
  /** Static fallback when an article has no summary in the database. */
  summaryFallback: "Full details for this event will be announced soon.",
  notFoundTitle: "Article not found",
} as const;
