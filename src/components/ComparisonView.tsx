import type { Item } from "../types";

type Props = {
  items: Item[];
};

export function ComparisonView({ items }: Props) {
  if (!items.length) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 overflow-x-auto">
      <p className=" text-gray-500 mb-4">Selected Items</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border p-3 rounded-lg">
            <div className="font-semibold mb-2">{item.title}</div>
            <div className="text-sm text-gray-500 mb-2">{item.category}</div>
            <div className="text-sm">
              Speed: {item.metrics.speed.toFixed(1)}
            </div>
            <div className="text-sm">Size: {item.metrics.size.toFixed(1)}</div>
            <div className="text-sm">
              Length: {item.metrics.length.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
