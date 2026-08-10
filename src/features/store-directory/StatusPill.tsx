import type { StoreStatus } from "@/lib/outlets";

type Props = {
  status: StoreStatus;
};

export function StatusPill({ status }: Props) {
  const active = status === "Active";
  return (
    <span className={`sd-pill ${active ? "sd-pill--active" : "sd-pill--inactive"}`}>
      {status}
    </span>
  );
}
