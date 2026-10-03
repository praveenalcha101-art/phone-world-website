import { Link, useParams } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import PhoneCard from "@/components/PhoneCard";
import { getBrandById, getPhonesByBrand } from "@/data/usePhones";
import { ArrowRight } from "@/components/ui/icons";

export default function BrandDetail() {
  const { brandId } = useParams();
  const brand = getBrandById(brandId);

  if (!brand) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-40 text-center">
          <h1 className="text-3xl font-bold text-white">Brand not found</h1>
          <Link to="/brands" className="mt-4 inline-block text-indigo-300 hover:text-indigo-200">
            ← Back to brands
          </Link>
        </div>
      </PageTransition>
    );
  }

  const phoneList = getPhonesByBrand(brand.name);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-10">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <span
            className="flex h-20 w-20 items-center justify-center rounded-3xl text-3xl font-black"
            style={{ backgroundColor: `${brand.color}26`, color: brand.color, border: `1px solid ${brand.color}66` }}
          >
            {brand.name.slice(0, 2).toUpperCase()}
          </span>
          <h1 className="text-4xl font-extrabold text-white">{brand.name}</h1>
          <p className="text-white/50">{phoneList.length} phones available</p>
          <Link
            to="/phones"
            state={{ brand: brand.name }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
          >
            Filter in full catalog <ArrowRight size={14} />
          </Link>
        </div>

        {phoneList.length === 0 ? (
          <p className="text-center text-white/50">No phones found for this brand yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {phoneList.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
