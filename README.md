# Phone World 📱✨

A modern, fully responsive 3D showcase of smartphones from every major brand — built with **React + Vite**,
**Tailwind CSS**, **React Three Fiber / Drei**, and **Framer Motion**.

## ✨ Features

- Full-screen 3D hero with scroll-driven phone rotation
- Procedural, zero-asset 3D phone model (rounded body, screen, camera bumps) — no GLB files required
- Interactive phone detail viewer: drag to rotate, scroll to zoom, auto-rotate toggle
- Live color-variant switching that recolors the 3D model in real time
- Exploded 3D view (screen / camera module / battery / motherboard / back panel) via slider
- Brand grid + brand detail pages
- Phone listing with search, multi-filter (brand, price, RAM, storage, battery, camera MP, 5G, year), sort, and grid/list toggle
- Compare up to 3 phones side-by-side with their 3D models and a full spec table
- Wishlist (in-memory/local state)
- Dark/Light theme toggle, glassmorphism cards, gradient glows
- Smooth page & scroll animations with Framer Motion
- Accessible markup, SEO meta tags, mobile-first responsive design

## 🧱 Tech Stack

- React 19 + Vite 7 + TypeScript
- Tailwind CSS 4
- `three`, `@react-three/fiber`, `@react-three/drei`
- `framer-motion`
- `react-router-dom` (HashRouter, so it works on static hosting with no server rewrites)

## 📂 Project Structure

```
src/
  components/
    3d/             # PhoneCanvas, PhoneModel (procedural 3D phone), loaders
    layout/          # Navbar, Footer, PageTransition
    ui/               # Button, GlassCard, Rating, icon set
    FilterPanel.tsx   # Phones listing filter controls
    PhoneCard.tsx     # Grid/list phone card
    PhoneSilhouette.tsx # Lightweight CSS phone thumbnail (used in cards/lists)
    BrandCarousel.tsx
  context/            # ThemeContext, WishlistContext, CompareContext
  data/
    phones.json       # All phone data (edit/add phones here)
    brands.json        # Brand list
    usePhones.ts       # Typed data accessors & helpers
  pages/               # Home, Brands, BrandDetail, Phones, PhoneDetail, Compare, About, Wishlist, NotFound
  types/phone.ts        # Phone & Brand TypeScript interfaces
  App.tsx               # Routing & providers
```

## 🚀 Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## ➕ Adding a New Phone

Open `src/data/phones.json` and append a new object following the `Phone` shape defined in
`src/types/phone.ts`:

```json
{
  "id": "brand-model-name",
  "name": "Model Name",
  "brand": "BrandName",
  "price": 599,
  "releaseYear": 2024,
  "colors": [{ "name": "Midnight", "hex": "#1a1a1a" }],
  "display": "6.5\" OLED, 120Hz",
  "chipset": "Snapdragon 8 Gen 3",
  "ram": ["8GB", "12GB"],
  "storage": ["128GB", "256GB"],
  "camera": "50MP + 12MP",
  "cameraMP": 50,
  "battery": "5000 mAh",
  "batteryMah": 5000,
  "charging": "67W Wired",
  "os": "Android 14",
  "rating": 4.4,
  "is5G": true,
  "pros": ["Great value", "Fast charging"],
  "cons": ["Plastic frame"],
  "trending": false,
  "bodyColor": "#1a1a1a",
  "screenColor": "#060608"
}
```

- `id` must be unique and URL-safe — it becomes the route `/phones/:phoneId`.
- `brand` must match (case-insensitively) an entry in `src/data/brands.json`. Add a new brand there first if needed.
- `bodyColor`/`screenColor` drive the default 3D model color (the `colors` array drives the live color switcher on
  the detail page).
- Set `"trending": true` to feature it in the Home page's Trending section.

## 🧊 Using Real 3D Models (GLB/GLTF)

By default every phone renders using the procedural `PhoneModel` component
(`src/components/3d/PhoneModel.tsx`) — a rounded box body, emissive screen plane, and camera bump, built entirely
from Three.js primitives so the app works with **zero binary assets**.

To use a real `.glb`/`.gltf` model instead:

1. Place the file in `public/models/your-phone.glb`.
2. Create a small wrapper component using `useGLTF` from `@react-three/drei`:

   ```tsx
   import { useGLTF } from "@react-three/drei";

   function RealPhoneModel({ color }: { color: string }) {
     const { scene } = useGLTF("/models/your-phone.glb");
     // traverse scene.children to recolor materials as needed
     return <primitive object={scene} />;
   }
   useGLTF.preload("/models/your-phone.glb");
   ```

3. Swap `<PhoneModel ... />` for `<RealPhoneModel ... />` wherever it's rendered (Home hero, PhoneDetail, Compare),
   optionally keyed by a new `modelPath` field you add to the phone data.
4. Because real GLTF loads are async, `PhoneCanvas` already wraps children in a `<Suspense>` boundary with a
   progress loader (`CanvasLoader.tsx` using `useProgress`), so loading states work out of the box.

## 🎨 Design System

- Dark, glassmorphic UI (`bg-white/[0.04]` + `backdrop-blur-xl` cards) with gradient glows (indigo → cyan)
- Typeface: Inter (loaded via Google Fonts in `index.html`)
- Reusable primitives in `src/components/ui`: `Button`, `GlassCard`, `Rating`, and a hand-rolled icon set
  (`icons.tsx`) to avoid extra icon-library weight

## 📝 Notes

- Routing uses `HashRouter` so the built `dist/index.html` works correctly even when opened as a static file or
  served without server-side rewrite rules.
- Wishlist and Compare state are kept in React context (in-memory for the session) — wire them up to
  `localStorage` or a backend if you need persistence across reloads.
