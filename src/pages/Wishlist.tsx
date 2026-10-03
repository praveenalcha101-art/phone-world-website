import { Link } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import PhoneCard from "@/components/PhoneCard";
import Button from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import { getPhoneById } from "@/data/usePhones";
import { Heart } from "@/components/ui/icons";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const items = wishlist.map((id) => getPhoneById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getPhoneById>>[];

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-10">
        <div className="mb-10 text-center">
          <h1 className="flex items-center justify-center gap-3 text-4xl font-extrabold text-white">
            <Heart size={30} filled className="text-pink-400" /> Your Wishlist
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-white/50">
            Phones you've saved for later. Your wishlist is kept locally for this session.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] py-20 text-center">
            <Heart size={40} className="text-white/20" />
            <p className="text-white/50">No phones in your wishlist yet.</p>
            <Link to="/phones">
              <Button>Browse Phones</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
