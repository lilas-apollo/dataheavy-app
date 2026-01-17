/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useRef, useEffect, useCallback } from "react";
import { fetchItems } from "./data/mockApi";
import { useInfiniteData } from "./hooks/useInfiniteData";
import { VirtualList } from "./components/VirtualList";
import { Filters } from "./components/Filters";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { Search } from "lucide-react";
import { useFiltersFromURL } from "./hooks/useFiltersFromURL";
import { DashboardStats } from "./components/DashboardStats";
import type { Item } from "./types";
import { ComparisonView } from "./components/ComparisonView";

function App() {
  const parentRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [filters] = useFiltersFromURL();
  const debouncedSearch = useDebouncedValue(query, 400);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const toggleSelectItem = (item: Item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id); // unselect
      } else if (prev.length < 3) {
        return [...prev, item]; // select
      }
      return prev; // ignore if already 3
    });
  };
  // Reset pagination when search changes
  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, filters]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  const { items, loadMore, hasMore, loading } = useInfiniteData(
    fetchItems,
    page,
    setPage,
    debouncedSearch,
    filters
  );

  return (
    <div ref={parentRef} className="h-screen overflow-auto p-6">
      <Filters />

      <h1 className="text-2xl font-bold mb-4 text-gray-600">
        Virtualized Infinite List
      </h1>

      {/* Search */}
      <div className="relative flex-1 mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
          className="xl:w-1/2 w-full rounded-md border p-3 pl-10 pr-8 text-sm border-gray-300 focus:ring-1 focus:ring-blue-300 outline-none"
        />
        {query && (
          <button
            className="absolute xl:right-1/2 xl:mr-2 right-2 top-2 text-gray-500 cursor-pointer text-lg"
            onClick={handleClear}
          >
            ×
          </button>
        )}
      </div>
      <ComparisonView items={selectedItems} />
      <DashboardStats items={items} />
      <VirtualList
        items={items}
        loadMore={loadMore}
        hasMore={hasMore}
        parentRef={parentRef}
        toggleSelectItem={toggleSelectItem}
        selectedItems={selectedItems}
      />

      {loading && (
        <div className="mt-2 mb-4 text-gray-500 text-center">Loading...</div>
      )}
      {!hasMore && !loading && (
        <div className="mt-2 mb-4 text-gray-500 text-center">No more data</div>
      )}
    </div>
  );
}

export default App;
