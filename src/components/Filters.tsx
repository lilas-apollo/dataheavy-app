/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useFiltersFromURL } from "../hooks/useFiltersFromURL";
import Select from "react-select";

const CATEGORIES = ["A", "B", "C", "D"];
const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({
  label: c,
  value: c,
}));
const STATUSES = ["active", "inactive"];
const STATUS_OPTIONS = STATUSES.map((s) => ({
  label: s,
  value: s,
}));

export function Filters() {
  const [appliedFilters, setAppliedFilters] = useFiltersFromURL();

  // Draft for UI only
  const [draft, setDraft] = useState(appliedFilters);

  useEffect(() => {
    setDraft(appliedFilters);
  }, [appliedFilters]);

  const applyFilters = () => {
    setAppliedFilters(draft); // update URL + app state
  };

  const clearFilters = () => {
    const empty = {
      categories: [] as any[],
      status: "",
      startDate: "",
      endDate: "",
    };
    setDraft(empty as any);
    setAppliedFilters(empty as any);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm mb-4 space-y-4">
      {/* Row 1: Status + Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Status</label>

          <Select
            options={STATUS_OPTIONS}
            isClearable
            value={STATUS_OPTIONS.find((o) => o.value === draft.status) || null}
            onChange={(selected) => {
              setDraft((d) => ({
                ...d,
                status: selected ? selected.value : "",
              }));
            }}
            classNamePrefix="react-select"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Category</label>
          <Select
            isMulti
            options={CATEGORY_OPTIONS}
            value={CATEGORY_OPTIONS.filter((o) =>
              draft.categories.includes(o.value)
            )}
            onChange={(selected) => {
              const values = (selected || []).map((o) => o.value);
              setDraft((d) => ({ ...d, categories: values }));
            }}
            classNamePrefix="react-select"
          />
        </div>
      </div>

      {/* Row 2: Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Start Date</label>
          <input
            type="date"
            value={draft.startDate}
            onChange={(e) =>
              setDraft((d) => ({ ...d, startDate: e.target.value }))
            }
            className="border border-gray-300 rounded px-4 py-2 focus:ring-1 focus:ring-blue-400 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">End Date</label>
          <input
            type="date"
            value={draft.endDate}
            onChange={(e) =>
              setDraft((d) => ({ ...d, endDate: e.target.value }))
            }
            className="border border-gray-300 rounded px-4 py-2 focus:ring-1 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={applyFilters}
          className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
