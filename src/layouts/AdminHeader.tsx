import { Logo } from "@/components/Logo";
import {
  BellIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { useOutlet } from "@/lib/outletContext";

import "./AdminHeader.css";

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AdminHeader() {
  const { user } = useAuth();
  const { outlets, selected, selectOutlet } = useOutlet();

  return (
    <header className="header">
      <div className="header__brand">
        <Logo variant="light" size={30} />
      </div>

      <div className="header__outletWrap">
        <select
          className="header__outlet"
          value={selected.id}
          onChange={(event) => selectOutlet(event.target.value)}
          aria-label="Select outlet"
        >
          {outlets.map((outlet) => (
            <option key={outlet.id} value={outlet.id}>
              {outlet.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon size={16} className="header__outletChevron" />
      </div>

      <div className="header__search">
        <SearchIcon size={18} />
        <input
          className="header__searchInput"
          placeholder="Search"
          aria-label="Search"
        />
      </div>

      <div className="header__right">
        <button type="button" className="header__bell" aria-label="Notifications">
          <BellIcon size={20} />
          <span className="header__bellDot" />
        </button>

        <div className="header__user">
          <span className="header__userMeta">
            <span className="header__userName">{user?.name ?? "Guest"}</span>
            <span className="header__userRole">{user?.role ?? "Viewer"}</span>
          </span>
          {user?.avatarUrl ? (
            <img className="header__avatar" src={user.avatarUrl} alt="" />
          ) : (
            <span className="header__avatar">
              {initialsOf(user?.name ?? "G")}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
