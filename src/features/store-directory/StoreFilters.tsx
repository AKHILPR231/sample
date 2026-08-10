import { SearchIcon } from "@/components/icons";

type Props = {
  query: string;
  onQuery: (value: string) => void;
  category: string;
  onCategory: (value: string) => void;
  status: string;
  onStatus: (value: string) => void;
  categories: string[];
  onClear: () => void;
  hasFilters: boolean;
};

export function StoreFilters({
  query,
  onQuery,
  category,
  onCategory,
  status,
  onStatus,
  categories,
  onClear,
  hasFilters,
}: Props) {
  return (
    <div className="sd-filters">
      <div className="sd-search">
        <SearchIcon size={16} />
        <input
          className="sd-search__input"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Filter by store name..."
          aria-label="Filter by store name"
        />
      </div>

      <label className="sd-select">
        <span className="sd-select__label">Category:</span>
        <select
          value={category}
          onChange={(event) => onCategory(event.target.value)}
          aria-label="Filter by category"
        >
          <option value="All">All</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="sd-select">
        <span className="sd-select__label">Status:</span>
        <select
          value={status}
          onChange={(event) => onStatus(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>

      <button
        type="button"
        className="sd-clear"
        onClick={onClear}
        disabled={!hasFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}
