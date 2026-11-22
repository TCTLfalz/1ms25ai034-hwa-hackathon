import type { Product } from "@/lib/products";
import { CartridgeArt, PodArt } from "@/components/ui/PodArt";

export default function ProductVisual({ product }: { product: Product }) {
  if (product.kind === "refill") {
    return (
      <div className="relative h-52">
        <CartridgeArt
          accent="clay"
          className="absolute left-[16%] top-[26%] w-16 rotate-[-14deg]"
        />
        <CartridgeArt
          accent="honey"
          className="absolute left-1/2 top-[14%] w-24 -translate-x-1/2"
        />
        <CartridgeArt
          accent="sage"
          className="absolute right-[16%] top-[28%] w-16 rotate-[14deg]"
        />
      </div>
    );
  }

  if (product.pods >= 5) {
    return (
      <div className="relative h-52">
        <PodArt
          accent="sage"
          className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2"
        />
        <PodArt accent="clay" className="absolute left-[4%] top-[8%] w-20" />
        <PodArt accent="honey" className="absolute right-[6%] top-[4%] w-16" />
        <PodArt accent="sage" className="absolute bottom-[2%] left-[14%] w-16" />
        <PodArt accent="clay" className="absolute bottom-0 right-[10%] w-24" />
      </div>
    );
  }

  return (
    <div className="relative h-52">
      <PodArt
        accent="clay"
        className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2"
      />
      <PodArt accent="sage" className="absolute bottom-[6%] left-[8%] w-20" />
      <PodArt accent="honey" className="absolute right-[6%] top-[8%] w-20" />
    </div>
  );
}
