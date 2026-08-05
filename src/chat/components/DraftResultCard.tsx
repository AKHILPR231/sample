import { CheckIcon } from "@/components/icons";

import type { ChatMessage } from "../types";

type ResultMessage = Extract<ChatMessage, { kind: "result" }>;

type Props = {
  message: ResultMessage;
  onApply: (messageId: string) => void;
};

export function DraftResultCard({ message, onApply }: Props) {
  const { id, title, cta, fields, applied } = message;

  return (
    <div className="cw-result">
      <div className="cw-result__head">
        <span className="cw-result__badge">
          <CheckIcon size={14} />
        </span>
        <span className="cw-result__title">{title}</span>
      </div>

      <dl className="cw-result__fields">
        {fields.map((field) => (
          <div key={field.label} className="cw-result__field">
            <dt>{field.label}</dt>
            <dd>{field.value}</dd>
          </div>
        ))}
      </dl>

      {applied ? (
        <div className="cw-result__applied">
          <CheckIcon size={14} /> Draft saved
        </div>
      ) : (
        <button
          type="button"
          className="cw-result__apply"
          onClick={() => onApply(id)}
        >
          {cta}
        </button>
      )}
    </div>
  );
}
