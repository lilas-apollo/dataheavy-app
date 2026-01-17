import type { Item } from "../types";

const categories = ["A", "B", "C", "D"];

function generateItem(id: number): Item {
  return {
    id,
    title: `Item ${id}`,
    category: categories[id % categories.length],
    status: id % 2 === 0 ? "active" : "inactive",
    createdAt: new Date(
      Date.now() - Math.random() * 1e10
    ).toISOString(),
    metrics: {
      speed: Math.random() * 100,
      size: Math.random() * 200,
      length: Math.random() * 300,
    },
  };
}

const ALL_DATA: Item[] = Array.from({ length: 5000 }, (_, i) =>
  generateItem(i + 1)
);

export function fetchItems(page: number, limit: number) {
  return new Promise<Item[]>((res) => {
    setTimeout(() => {
      const start = page * limit;
      const end = start + limit;
      res(ALL_DATA.slice(start, end));
    }, 400);
  });
}
