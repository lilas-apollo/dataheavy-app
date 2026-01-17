// src/hooks/useFilteredItems.ts
import { useMemo } from "react";
import type { Item, Filters } from "../types";

export function useFilteredItems(items: Item[], filters: Filters) {
  const debouncedSearch = filters.search; // we’ll apply debounce in component
  return useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (filters.categories.length && !filters.categories.includes(item.category)) return false;

      // Status filter
      if (filters.status && item.status !== filters.status) return false;

      // Date range filter
      const created = new Date(item.createdAt).getTime();
      if (filters.startDate && created < new Date(filters.startDate).getTime()) return false;
      if (filters.endDate && created > new Date(filters.endDate).getTime()) return false;

      // Search filter (debounced)
      if (debouncedSearch && !item.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
        return false;

      return true;
    });
  }, [items, filters, debouncedSearch]);
}
