import { brands, priceBounds, yearBounds } from "@/data/usePhones";
import { Check } from "@/components/ui/icons";
import { cn } from "@/utils/cn";

export interface Filters {
  search: string;
  selectedBrands: string[];
  minPrice: number;
  maxPrice: number;
  ram: string[];
  storage: string[];
  minBattery: number;
  minCameraMP: number;
  only5G: boolean;
  minYear: number;
  maxYear: number;
}

export const defaultFilters: Filters = {
  search: "",
  selectedBrands: [],
  minPrice: priceBounds.min,
  maxPrice: priceBounds.max,
  ram: [],
  storage: [],
  minBattery: 0,
  minCameraMP: 0,
  only5G: false,
  minYear: yearBounds.min,
  maxYear: yearBounds.max,
};

const ramOptions = ["4GB", "6GB", "8GB", "12GB", "16GB", "24GB"];
const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition",
        checked
          ? "border-indigo-400/50 bg-indigo-400/10 text-white"
          : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white"
      )}
    >
      {label}
      {checked && <Check size={14} className="text-indigo-300" />}
    </button>
  );
}

export default function FilterPanel({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
}) {
  const toggleArray = (key: "selectedBrands" | "ram" | "storage", value: string) => {
    const arr = filters[key];
    setFilters({
      ...filters,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  };

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Brand</h3>
        <div className="grid grid-cols-2 gap-2">
          {brands.map((b) => (
            <Checkbox
              key={b.id}
              label={b.name}
              checked={filters.selectedBrands.includes(b.name)}
              onChange={() => toggleArray("selectedBrands", b.name)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          Price: ${filters.minPrice.toLocaleString()} – ${filters.maxPrice.toLocaleString()}
        </h3>
        <div className="flex flex-col gap-3">
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: Math.min(Number(e.target.value), filters.maxPrice) })
            }
            className="accent-indigo-400"
          />
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Math.max(Number(e.target.value), filters.minPrice) })
            }
            className="accent-cyan-400"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">RAM</h3>
        <div className="grid grid-cols-3 gap-2">
          {ramOptions.map((r) => (
            <Checkbox key={r} label={r} checked={filters.ram.includes(r)} onChange={() => toggleArray("ram", r)} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Storage</h3>
        <div className="grid grid-cols-3 gap-2">
          {storageOptions.map((s) => (
            <Checkbox
              key={s}
              label={s}
              checked={filters.storage.includes(s)}
              onChange={() => toggleArray("storage", s)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          Min Battery: {filters.minBattery.toLocaleString()} mAh
        </h3>
        <input
          type="range"
          min={0}
          max={6000}
          step={200}
          value={filters.minBattery}
          onChange={(e) => setFilters({ ...filters, minBattery: Number(e.target.value) })}
          className="w-full accent-indigo-400"
        />
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          Min Camera: {filters.minCameraMP}MP
        </h3>
        <input
          type="range"
          min={0}
          max={200}
          step={10}
          value={filters.minCameraMP}
          onChange={(e) => setFilters({ ...filters, minCameraMP: Number(e.target.value) })}
          className="w-full accent-indigo-400"
        />
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          Release Year: {filters.minYear} – {filters.maxYear}
        </h3>
        <div className="flex gap-3">
          <select
            value={filters.minYear}
            onChange={(e) => setFilters({ ...filters, minYear: Number(e.target.value) })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white"
          >
            {Array.from({ length: yearBounds.max - yearBounds.min + 1 }, (_, i) => yearBounds.min + i).map((y) => (
              <option key={y} value={y} className="bg-[#0a0a10]">
                {y}
              </option>
            ))}
          </select>
          <select
            value={filters.maxYear}
            onChange={(e) => setFilters({ ...filters, maxYear: Number(e.target.value) })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white"
          >
            {Array.from({ length: yearBounds.max - yearBounds.min + 1 }, (_, i) => yearBounds.min + i).map((y) => (
              <option key={y} value={y} className="bg-[#0a0a10]">
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Checkbox
        label="5G devices only"
        checked={filters.only5G}
        onChange={() => setFilters({ ...filters, only5G: !filters.only5G })}
      />

      <button
        onClick={() => setFilters(defaultFilters)}
        className="rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        Reset all filters
      </button>
    </div>
  );
}
