// src/types.ts
export type Item = {
  id: number;
  title: string;
  category: string;
  status: "active" | "inactive";
  createdAt: string;
  metrics: {
    speed: number;
    size: number;
    length: number;
  };
};

export type Filters = {
  categories: string[]; // multi-select
  status: string | ""; // single status
  startDate: string | ""; // ISO string
  endDate: string | ""; // ISO string
  search: string; // free text search
};
