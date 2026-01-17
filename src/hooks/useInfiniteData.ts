/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, useCallback } from "react";
import type { Item } from "../types";

export function useInfiniteData(
  fetchFn: (
    page: number,
    limit: number,
    search: string,
    filters: any
  ) => Promise<Item[]>,
  page: number,
  setPage: (n: any) => void,
  search: string,
  filters: any
) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetchFn(page, limit, search, filters).then((data) => {
      if (cancelled) return;

      setItems((prev) => (page === 0 ? data : [...prev, ...data]));
      setHasMore(data.length === limit);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [page, search, fetchFn, filters]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev: number) => prev + 1);
    }
  }, [loading, hasMore, setPage]);

  return { items, loadMore, hasMore, loading };
}
