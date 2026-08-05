import { NavLink, useNavigate } from "react-router-dom";

import { LogoutIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth";

import { NAV_ITEMS } from "./navItems";

import "./AdminSidebar.css";

export function AdminSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.id}
          to={item.to}
          end={item.to === "/admin"}
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          {item.icon}
          <span className="sidebar__label">{item.label}</span>
        </NavLink>
      ))}

      <div className="sidebar__spacer" />

      <button type="button" className="sidebar__signout" onClick={handleSignOut}>
        <LogoutIcon size={18} />
        <span className="sidebar__label">Sign out</span>
      </button>
    </aside>
  );
}
