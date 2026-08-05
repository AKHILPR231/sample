import { WELCOME_CHIPS } from "../flows";
import type { WelcomeChip } from "../types";

type Props = {
  onSelect: (chip: WelcomeChip) => void;
  compact?: boolean;
};

export function SuggestionChips({ onSelect, compact = false }: Props) {
  return (
    <div className={`cw-suggestions ${compact ? "cw-suggestions--compact" : ""}`}>
      {WELCOME_CHIPS.map((chip) => (
        <button
          key={chip.id}
          type="button"
          className="cw-suggestion"
          onClick={() => onSelect(chip)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
