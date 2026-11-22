import { getProduct } from "@/lib/products";
import { CartridgeArt, PodArt } from "@/components/ui/PodArt";

export default function MiniArt({ id }: { id: string }) {
  const product = getProduct(id);
  if (!product) return null;

  return product.kind === "refill" ? (
    <CartridgeArt accent={product.accent} className="h-full w-full" />
  ) : (
    <PodArt accent={product.accent} className="h-full w-full" />
  );
}
