import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { brands, brandCount, getPhonesByBrand } from "@/data/usePhones";
import PageTransition from "@/components/layout/PageTransition";

export default function Brands() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">All Brands</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/50">
            From Cupertino to Shenzhen — browse every manufacturer in the Phone World catalog.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((b, i) => {
            const count = brandCount(b.name);
            const minPrice = Math.min(...getPhonesByBrand(b.name).map((p) => p.price));
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              >
                <Link
                  to={`/brands/${b.id}`}
                  className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-10 text-center backdrop-blur-xl transition hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <div
                    className="absolute -top-10 h-32 w-32 rounded-full opacity-20 blur-3xl transition group-hover:opacity-40"
                    style={{ backgroundColor: b.color }}
                  />
                  <span
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black"
                    style={{ backgroundColor: `${b.color}26`, color: b.color, border: `1px solid ${b.color}66` }}
                  >
                    {b.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="relative">
                    <h3 className="text-lg font-semibold text-white">{b.name}</h3>
                    <p className="mt-1 text-xs text-white/40">{count} models</p>
                    {Number.isFinite(minPrice) && (
                      <p className="mt-0.5 text-xs text-white/40">from ${minPrice.toLocaleString()}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
