// src/hooks/useFiltersFromURL.ts
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import type { Filters } from "../types";

export function useFiltersFromURL(): [Filters, (filters: Filters) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = useMemo(() => {
    return {
      categories: searchParams.get("categories")
        ? searchParams.get("categories")!.split(",")
        : [],
      status: searchParams.get("status") || "",
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
      search: searchParams.get("search") || "",
    };
  }, [searchParams]);

  const setFilters = (newFilters: Filters) => {
    const params = new URLSearchParams();
    if (newFilters.categories.length)
      params.set("categories", newFilters.categories.join(","));
    if (newFilters.status) params.set("status", newFilters.status);
    if (newFilters.startDate) params.set("startDate", newFilters.startDate);
    if (newFilters.endDate) params.set("endDate", newFilters.endDate);
    if (newFilters.search) params.set("search", newFilters.search);
    setSearchParams(params);
  };

  return [filters, setFilters];
}
