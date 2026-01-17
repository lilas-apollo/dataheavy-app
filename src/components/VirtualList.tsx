import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useCallback } from "react";
import type { Item } from "../types";

type Props = {
  items: Item[];
  loadMore: () => void;
  hasMore: boolean;
  parentRef: React.RefObject<HTMLDivElement | null>;
  toggleSelectItem: (item: Item) => void;
  selectedItems: Item[];
};

export function VirtualList({
  items,
  loadMore,
  hasMore,
  parentRef,
  toggleSelectItem,
  selectedItems,
}: Props) {
  const columns = 3; // number of items per row
  const rows = Math.ceil(items.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140, // height of one row
    overscan: 5,
  });

  // Infinite scroll using scroll event
  const handleScroll = useCallback(() => {
    const el = parentRef.current;
    if (!el || !hasMore) return;

    const threshold = 200; // pixels from bottom to trigger load
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - threshold) {
      loadMore();
    }
  }, [hasMore, loadMore]);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="mt-6">
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((vRow) => {
          const start = vRow.index * columns;
          const rowItems = items.slice(start, start + columns);

          return (
            <div
              key={vRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${vRow.start}px)`,
              }}
              className="grid grid-cols-3 gap-4"
            >
              {rowItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleSelectItem(item)}
                  className={`bg-white rounded-lg border shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 cursor-pointer transition ${
                    selectedItems.find((i) => i.id === item.id)
                      ? "border-blue-600 border-2"
                      : ""
                  }`}
                >
                  <div>
                    <div className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700">
                        {item.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs rounded ${
                          item.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xs text-gray-500">Speed</div>
                      <div className="font-medium">
                        {item.metrics.speed.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Size</div>
                      <div className="font-medium">
                        {item.metrics.size.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Length</div>
                      <div className="font-medium">
                        {item.metrics.length.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
