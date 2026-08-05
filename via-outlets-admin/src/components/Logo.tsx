type Props = {
  variant?: "light" | "dark";
  size?: number;
};

/** The VIA Outlets "V" chevron mark + wordmark. */
export function Logo({ variant = "dark", size = 34 }: Props) {
  const wordColor = variant === "light" ? "#ffffff" : "var(--ink)";
  const subColor = variant === "light" ? "rgba(255,255,255,0.65)" : "var(--muted)";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path d="M8 8h9l7 20 7-20h9L28 40h-8L8 8Z" fill="var(--brand-blue)" />
        <path d="M20 8h8l-4 11-4-11Z" fill="#7aa2ff" />
      </svg>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <strong
          style={{
            color: wordColor,
            fontSize: 18,
            letterSpacing: "0.14em",
            fontWeight: 700,
          }}
        >
          VIA OUTLETS
        </strong>
        <span
          style={{
            color: subColor,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Management
        </span>
      </span>
    </span>
  );
}
