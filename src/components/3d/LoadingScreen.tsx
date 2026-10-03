import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + (100 - p) * 0.18 + 1.5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 350);
          return 100;
        }
        return next;
      });
    }, 110);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[#06060a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/40" />
            <span className="text-2xl font-semibold tracking-tight text-white">
              Phone<span className="text-indigo-400">World</span>
            </span>
          </div>
          <div className="h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-400 to-cyan-400"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="font-mono text-xs text-white/40">Loading 3D experience {Math.round(Math.min(progress, 100))}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
