import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import PhoneCard from "@/components/PhoneCard";
import FilterPanel, { defaultFilters, type Filters } from "@/components/FilterPanel";
import Button from "@/components/ui/Button";
import { phones } from "@/data/usePhones";
import { Grid, List, Search, SlidersHorizontal, X } from "@/components/ui/icons";

type SortKey = "relevance" | "price-asc" | "price-desc" | "newest" | "rating";

export default function Phones() {
  const location = useLocation();
  const presetBrand = (location.state as { brand?: string } | null)?.brand;

  const [filters, setFilters] = useState<Filters>(
    presetBrand ? { ...defaultFilters, selectedBrands: [presetBrand] } : defaultFilters
  );
  const [sort, setSort] = useState<SortKey>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (presetBrand) {
      setFilters((f) => ({ ...f, selectedBrands: [presetBrand] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetBrand]);

  const filtered = useMemo(() => {
    let list = phones.filter((p) => {
      if (filters.search && !`${p.name} ${p.brand}`.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.selectedBrands.length && !filters.selectedBrands.includes(p.brand)) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (filters.ram.length && !filters.ram.some((r) => p.ram.includes(r))) return false;
      if (filters.storage.length && !filters.storage.some((s) => p.storage.includes(s))) return false;
      if (p.batteryMah < filters.minBattery) return false;
      if (p.cameraMP < filters.minCameraMP) return false;
      if (filters.only5G && !p.is5G) return false;
      if (p.releaseYear < filters.minYear || p.releaseYear > filters.maxYear) return false;
      return true;
    });

    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [filters, sort]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-10">
        <div className="mb-8 flex flex-col gap-2 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-white">All Phones</h1>
          <p className="text-white/50">
            Showing {filtered.length} of {phones.length} phones
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
                <SlidersHorizontal size={16} /> Filters
              </h2>
              <FilterPanel filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          <div>
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 sm:max-w-xs">
                <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Search phones..."
                  className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-indigo-400/50 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-indigo-400/50 focus:outline-none"
                >
                  <option value="relevance" className="bg-[#0a0a10]">Sort: Relevance</option>
                  <option value="price-asc" className="bg-[#0a0a10]">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#0a0a10]">Price: High to Low</option>
                  <option value="newest" className="bg-[#0a0a10]">Newest First</option>
                  <option value="rating" className="bg-[#0a0a10]">Highest Rated</option>
                </select>

                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition ${view === "grid" ? "bg-white text-black" : "text-white/60"}`}
                    aria-label="Grid view"
                  >
                    <Grid size={15} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition ${view === "list" ? "bg-white text-black" : "text-white/60"}`}
                    aria-label="List view"
                  >
                    <List size={15} />
                  </button>
                </div>

                <Button variant="secondary" size="sm" className="lg:hidden" onClick={() => setDrawerOpen(true)}>
                  <SlidersHorizontal size={15} /> Filters
                </Button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-16 text-center text-white/50">
                No phones match your filters. Try broadening your search.
              </div>
            ) : (
              <motion.div
                layout
                className={view === "grid" ? "grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-4"}
              >
                <AnimatePresence>
                  {filtered.map((phone) => (
                    <PhoneCard key={phone.id} phone={phone} listView={view === "list"} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-[70] w-[85%] max-w-sm overflow-y-auto bg-[#0a0a12] p-6 lg:hidden"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <SlidersHorizontal size={16} /> Filters
                </h2>
                <button onClick={() => setDrawerOpen(false)} className="text-white/60">
                  <X size={20} />
                </button>
              </div>
              <FilterPanel filters={filters} setFilters={setFilters} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
