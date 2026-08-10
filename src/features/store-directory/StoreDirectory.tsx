import { useMemo, useState } from "react";

import { useOutlet } from "@/lib/outletContext";

import { BrandLogo } from "./BrandLogo";
import { StatusPill } from "./StatusPill";
import { StoreFilters } from "./StoreFilters";

import "./StoreDirectory.css";

const COLUMNS = [
  "Store Name",
  "Brand",
  "Category",
  "Location/Zone",
  "Status",
  "Operating Hours",
  "Last Updated",
];

export function StoreDirectory() {
  const { selected } = useOutlet();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  // Distinct categories available for the current outlet.
  const categories = useMemo(
    () =>
      Array.from(new Set(selected.stores.map((store) => store.category))).sort(),
    [selected],
  );

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return selected.stores.filter((store) => {
      const matchesName =
        needle.length === 0 || store.name.toLowerCase().includes(needle);
      const matchesCategory =
        category === "All" || store.category === category;
      const matchesStatus = status === "All" || store.status === status;
      return matchesName && matchesCategory && matchesStatus;
    });
  }, [selected, query, category, status]);

  const hasFilters = query !== "" || category !== "All" || status !== "All";

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setStatus("All");
  };

  return (
    <section className="sd">
      <StoreFilters
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
        status={status}
        onStatus={setStatus}
        categories={categories}
        onClear={clearFilters}
        hasFilters={hasFilters}
      />

      <div className="sd-tableWrap">
        <table className="sd-table">
          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((store) => (
              <tr key={store.id}>
                <td>
                  <div className="sd-store">
                    <BrandLogo brand={store.brand} />
                    <span className="sd-store__name">{store.name}</span>
                  </div>
                </td>
                <td className="sd-muted">{store.brand}</td>
                <td className="sd-strong">{store.category}</td>
                <td className="sd-muted">{store.zone}</td>
                <td>
                  <StatusPill status={store.status} />
                </td>
                <td className="sd-muted">{store.hours}</td>
                <td className="sd-muted">{store.updated}</td>
              </tr>
            ))}

            {rows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="sd-empty">
                  No stores match your filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="sd-footer">
        <span className="sd-count">
          Showing {rows.length} of {selected.stores.length} stores
        </span>

        <div className="sd-pager">
          <button type="button" className="sd-pager__btn" disabled>
            Previous
          </button>
          <button type="button" className="sd-pager__btn sd-pager__btn--active">
            1
          </button>
          <button type="button" className="sd-pager__btn" disabled>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
