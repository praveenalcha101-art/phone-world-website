import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Phone } from "@/types/phone";
import PhoneSilhouette from "./PhoneSilhouette";
import Rating from "@/components/ui/Rating";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { Heart, Scale } from "@/components/ui/icons";
import { cn } from "@/utils/cn";

export default function PhoneCard({ phone, listView = false }: { phone: Phone; listView?: boolean }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isComparing, toggleCompare, maxReached } = useCompare();
  const wished = isWishlisted(phone.id);
  const comparing = isComparing(phone.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/[0.07]",
        listView ? "flex items-center gap-5 p-4" : "flex flex-col p-5"
      )}
    >
      <div className="absolute right-3 top-3 z-10 flex gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(phone.id);
          }}
          aria-label="Toggle wishlist"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition",
            wished ? "border-pink-400/50 bg-pink-400/20 text-pink-400" : "border-white/10 bg-black/30 text-white/70 hover:text-white"
          )}
        >
          <Heart size={15} filled={wished} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleCompare(phone.id);
          }}
          disabled={!comparing && maxReached}
          aria-label="Toggle compare"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition",
            comparing ? "border-cyan-400/50 bg-cyan-400/20 text-cyan-300" : "border-white/10 bg-black/30 text-white/70 hover:text-white disabled:opacity-30"
          )}
        >
          <Scale size={15} />
        </button>
      </div>

      <Link
        to={`/phones/${phone.id}`}
        className={cn("flex items-center justify-center", listView ? "h-28 w-24 shrink-0" : "h-48 w-full")}
      >
        <PhoneSilhouette
          bodyColor={phone.bodyColor}
          screenColor={phone.screenColor}
          className="h-full w-full transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
        />
      </Link>

      <div className={cn("flex min-w-0 flex-1 flex-col", listView ? "gap-1" : "mt-4 gap-2")}>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
            {phone.brand}
          </span>
          {phone.is5G && (
            <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
              5G
            </span>
          )}
        </div>
        <Link to={`/phones/${phone.id}`} className="truncate text-base font-semibold text-white hover:text-indigo-300">
          {phone.name}
        </Link>
        <div className="flex items-center gap-3 text-xs text-white/50">
          <span>{phone.releaseYear}</span>
          <span>•</span>
          <span>{phone.storage[0]}</span>
        </div>
        <Rating value={phone.rating} />
        <div className="mt-1 flex items-center justify-between">
          <span className="text-lg font-bold text-white">${phone.price.toLocaleString()}</span>
          <Link
            to={`/phones/${phone.id}`}
            className="text-xs font-semibold text-indigo-300 opacity-0 transition group-hover:opacity-100"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
