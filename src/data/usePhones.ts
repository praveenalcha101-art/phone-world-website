import phonesData from "./phones.json";
import brandsData from "./brands.json";
import type { Phone, Brand } from "@/types/phone";

export const phones = phonesData as Phone[];
export const brands = brandsData as Brand[];

export function getPhoneById(id: string | undefined): Phone | undefined {
  if (!id) return undefined;
  return phones.find((p) => p.id === id);
}

export function getPhonesByBrand(brandName: string): Phone[] {
  return phones.filter((p) => p.brand.toLowerCase() === brandName.toLowerCase());
}

export function getBrandById(id: string | undefined): Brand | undefined {
  if (!id) return undefined;
  return brands.find((b) => b.id === id);
}

export function getTrendingPhones(): Phone[] {
  return phones.filter((p) => p.trending);
}

export function getSimilarPhones(phone: Phone, count = 4): Phone[] {
  return phones
    .filter((p) => p.id !== phone.id)
    .map((p) => ({
      phone: p,
      score:
        (p.brand === phone.brand ? 2 : 0) +
        (Math.abs(p.price - phone.price) < 250 ? 2 : 0) -
        Math.abs(p.price - phone.price) / 1000,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.phone);
}

export const brandCount = (brandName: string) => getPhonesByBrand(brandName).length;

export const priceBounds = {
  min: Math.min(...phones.map((p) => p.price)),
  max: Math.max(...phones.map((p) => p.price)),
};

export const yearBounds = {
  min: Math.min(...phones.map((p) => p.releaseYear)),
  max: Math.max(...phones.map((p) => p.releaseYear)),
};
