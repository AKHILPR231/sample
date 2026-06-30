export type NewsHeaderProps = {
  title: string;
  onBack?: () => void;
  /** When provided, shows a share action on the right. */
  onShare?: () => void;
};
