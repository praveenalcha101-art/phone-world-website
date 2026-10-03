import { Link } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 text-center">
        <p className="text-8xl font-black text-white/10">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">This page went off the grid.</h1>
        <p className="mt-2 text-white/50">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-8">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </PageTransition>
  );
}
