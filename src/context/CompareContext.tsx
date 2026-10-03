import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const MAX_COMPARE = 3;

interface CompareContextValue {
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  toggleCompare: (id: string) => void;
  isComparing: (id: string) => boolean;
  clearCompare: () => void;
  maxReached: boolean;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      compareList,
      addToCompare: (id: string) =>
        setCompareList((prev) => (prev.includes(id) || prev.length >= MAX_COMPARE ? prev : [...prev, id])),
      removeFromCompare: (id: string) => setCompareList((prev) => prev.filter((p) => p !== id)),
      toggleCompare: (id: string) =>
        setCompareList((prev) => {
          if (prev.includes(id)) return prev.filter((p) => p !== id);
          if (prev.length >= MAX_COMPARE) return prev;
          return [...prev, id];
        }),
      isComparing: (id: string) => compareList.includes(id),
      clearCompare: () => setCompareList([]),
      maxReached: compareList.length >= MAX_COMPARE,
    }),
    [compareList]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
