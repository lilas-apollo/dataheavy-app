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
