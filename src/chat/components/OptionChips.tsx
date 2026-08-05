import type { ChatMessage, FlowOption } from "../types";

type OptionsMessage = Extract<ChatMessage, { kind: "options" }>;

type Props = {
  message: OptionsMessage;
  onSingle: (messageId: string, option: FlowOption) => void;
  onToggle: (messageId: string, optionId: string) => void;
  onSubmit: (messageId: string) => void;
  onAction: (messageId: string, option: FlowOption) => void;
};

export function OptionChips({
  message,
  onSingle,
  onToggle,
  onSubmit,
  onAction,
}: Props) {
  const { id, mode, options, selected, answered } = message;

  if (mode === "action") {
    const option = options[0];
    return (
      <div className="cw-options">
        <button
          type="button"
          className="cw-action"
          disabled={answered}
          onClick={() => onAction(id, option)}
        >
          {option.label}
        </button>
      </div>
    );
  }

  return (
    <div className="cw-options">
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        const cls = [
          "cw-chip",
          answered ? "cw-chip--muted" : "",
          mode === "multi" && isSelected ? "cw-chip--selected" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={option.id}
            type="button"
            className={cls}
            disabled={answered}
            onClick={() =>
              mode === "single"
                ? onSingle(id, option)
                : onToggle(id, option.id)
            }
          >
            {option.label}
            {mode === "multi" && isSelected ? (
              <span className="cw-chip__x">×</span>
            ) : null}
          </button>
        );
      })}

      {mode === "multi" && !answered && selected.length > 0 ? (
        <button
          type="button"
          className="cw-chip cw-chip--submit"
          onClick={() => onSubmit(id)}
        >
          Continue
        </button>
      ) : null}
    </div>
  );
}
