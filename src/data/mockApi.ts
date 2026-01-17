import type { Item } from "../types";

const categories = ["A", "B", "C", "D"];

function generateItem(id: number): Item {
  return {
    id,
    title: `Item ${id}`,
    category: categories[id % categories.length],
    status: id % 2 === 0 ? "active" : "inactive",
    createdAt: new Date(Date.now() - Math.random() * 1e10).toISOString(),
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

type Filters = {
  categories?: string[];
  status?: string;
  startDate?: string;
  endDate?: string;
};

export function fetchItems(
  page: number,
  limit: number,
  search: string,
  filters?: Filters
) {
  return new Promise<Item[]>((res) => {
    setTimeout(() => {
      let data = ALL_DATA;

      // Search
      if (search) {
        const q = search.toLowerCase();
        data = data.filter((i) => i.title.toLowerCase().includes(q));
      }

      // Filters
      if (filters?.categories && filters?.categories?.length > 0) {
        data = data.filter((i) => filters?.categories?.includes(i.category));
      }

      if (filters?.status) {
        data = data.filter((i) => i.status === filters.status);
      }

      if (filters?.startDate) {
        data = data.filter(
          (i) => new Date(i.createdAt) >= new Date(filters.startDate!)
        );
      }

      if (filters?.endDate) {
        data = data.filter(
          (i) => new Date(i.createdAt) <= new Date(filters.endDate!)
        );
      }

      const start = page * limit;
      const end = start + limit;
      res(data.slice(start, end));
    }, 400);
  });
}
