import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface WishlistContextValue {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      wishlist,
      toggleWishlist: (id: string) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id])),
      isWishlisted: (id: string) => wishlist.includes(id),
    }),
    [wishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
