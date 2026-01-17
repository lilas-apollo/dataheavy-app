import { useMemo } from "react";
import type { Item } from "../types";

type Props = {
  items: Item[];
};

export function DashboardStats({ items }: Props) {
  const stats = useMemo(() => {
    const total = items.length;
    const avg = {
      speed: total ? items.reduce((sum, i) => sum + i.metrics.speed, 0) / total : 0,
      size: total ? items.reduce((sum, i) => sum + i.metrics.size, 0) / total : 0,
      length: total ? items.reduce((sum, i) => sum + i.metrics.length, 0) / total : 0,
    };

    const groupedByCategory = items.reduce<Record<string, number>>((acc, i) => {
      acc[i.category] = (acc[i.category] || 0) + 1;
      return acc;
    }, {});

    return { total, avg, groupedByCategory };
  }, [items]);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 grid md:grid-cols-3 gap-4">
      <div>
        <p className="text-sm text-gray-500">Total Items</p>
        <div className="text-lg font-semibold">{stats.total}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Average Metrics</div>
        <div className="flex gap-4 text-sm">
          <div>Speed: {stats.avg.speed.toFixed(1)}</div>
          <div>Size: {stats.avg.size.toFixed(1)}</div>
          <div>Length: {stats.avg.length.toFixed(1)}</div>
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Items by Category</div>
        <div className="flex gap-2 flex-wrap text-sm">
          {Object.entries(stats.groupedByCategory).map(([cat, count]) => (
            <span
              key={cat}
              className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded"
            >
              {cat}: {count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
