type Props = {
  text: string;
  variant: "ai" | "user";
};

export function ChatBubble({ text, variant }: Props) {
  return (
    <div className={`cw-row cw-row--${variant}`}>
      <div className={`cw-bubble cw-bubble--${variant}`}>{text}</div>
    </div>
  );
}
