import { useCallback, useMemo, useState } from "react";

import type { SearchResult, SearchResultType } from "@/features/search/types";

import { useSearchResults } from "./useSearchResults";

const matchesQuery = (result: SearchResult, rawQuery: string): boolean => {
  const needle = rawQuery.trim().toLowerCase();
  if (!needle) return true;
  return (
    result.title.toLowerCase().includes(needle) ||
    result.category.toLowerCase().includes(needle)
  );
};

type UseSearchResult = {
  query: string;
  setQuery: (value: string) => void;
  activeType: SearchResultType | null;
  toggleType: (type: SearchResultType) => void;
  results: SearchResult[];
  loading: boolean;
  hasQuery: boolean;
};

/** Search interaction layer: text query + single-select type filter. */
export function useSearch(): UseSearchResult {
  const { results, loading } = useSearchResults();
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<SearchResultType | null>(null);

  const toggleType = useCallback((type: SearchResultType) => {
    setActiveType((current) => (current === type ? null : type));
  }, []);

  const filtered = useMemo<SearchResult[]>(
    () =>
      results.filter(
        (result) =>
          (activeType ? result.type === activeType : true) &&
          matchesQuery(result, query),
      ),
    [results, activeType, query],
  );

  return {
    query,
    setQuery,
    activeType,
    toggleType,
    results: filtered,
    loading,
    hasQuery: query.trim().length > 0,
  };
}
