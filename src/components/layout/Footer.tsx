import { Link } from "react-router-dom";
import { brands } from "@/data/usePhones";
import { Mail, MapPin, Phone } from "@/components/ui/icons";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#05050a] px-5 pb-10 pt-16 text-white/70 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-black text-white">
              PW
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              Phone<span className="text-indigo-400">World</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            An immersive 3D showcase of smartphones from every major brand. Explore, compare, and find your next
            device.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/phones" className="hover:text-white">All Phones</Link></li>
            <li><Link to="/brands" className="hover:text-white">Brands</Link></li>
            <li><Link to="/compare" className="hover:text-white">Compare</Link></li>
            <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Top Brands</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {brands.slice(0, 8).map((b) => (
              <li key={b.id}>
                <Link to={`/brands/${b.id}`} className="hover:text-white">
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail size={16} /> hello@phoneworld.app</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +1 (555) 012-3456</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> San Francisco, CA</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
        <p>© {new Date().getFullYear()} Phone World. All rights reserved.</p>
        <p>Designed &amp; built with React, Three.js and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
