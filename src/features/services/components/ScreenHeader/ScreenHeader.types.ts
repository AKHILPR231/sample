export type ScreenHeaderProps = {
  title: string;
  /** Optional smaller line shown under the title. */
  subtitle?: string;
  /** Shows a back chevron and wires it up when provided. */
  onBack?: () => void;
};
