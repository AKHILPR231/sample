export type InfoRowProps = {
  /** Left-hand label (e.g. a day range, or omitted for a bullet line). */
  label?: string;
  /** Right-hand value, emphasised. */
  value: string;
  /** Render as a bullet line (value only, left-aligned) instead of a split row. */
  bullet?: boolean;
  /** Removes the bottom divider on the final row. */
  last?: boolean;
};
