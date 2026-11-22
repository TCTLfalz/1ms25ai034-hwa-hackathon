"use client";

import Image, { type StaticImageData } from "next/image";
import type { Product } from "@/lib/products";
import {
  FLAT_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  formatMoney,
} from "@/lib/products";
import { useCart } from "@/components/cart/CartProvider";
import { Check, Plus } from "@/components/ui/Icons";
import starterKitImage from "@/images/starter-kit.png";
import proKitImage from "@/images/pro-kit.png";
import refillPackImage from "@/images/refill-pack.png";

const PRODUCT_MEDIA: Record<
  string,
  { image: StaticImageData; alt: string }
> = {
  "starter-kit": {
    image: starterKitImage,
    alt: "Starter Kit with three white Nosy Paws scent pods and three pastel scent cartridges",
  },
  "pro-kit": {
    image: proKitImage,
    alt: "Pro Kit with five white Nosy Paws scent pods and six pastel scent cartridges",
  },
  "refill-pack": {
    image: refillPackImage,
    alt: "Six pastel Nosy Paws scent refill cartridges lined up in a row",
  },
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const media = PRODUCT_MEDIA[product.id] ?? PRODUCT_MEDIA["starter-kit"];

  return (
    <article className="group flex flex-col rounded-[2rem] border border-ink/10 bg-white/80 p-3 shadow-card backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-sand via-[#F8F1E6] to-oat/60">
        {product.badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-ink px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-cream">
            {product.badge}
          </span>
        )}
        <Image
          src={media.image}
          alt={media.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-clay">
              {product.tagline}
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold">
              {product.name}
            </h3>
          </div>
          <p className="whitespace-nowrap font-display text-2xl font-semibold">
            {formatMoney(product.price)}
          </p>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          {product.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-muted">
              <Check className="mt-0.5 h-4 w-4 flex-none text-sage" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => addItem(product.id)}
          className="btn btn-primary mt-6 w-full"
          aria-label={`Add ${product.name} to cart for ${formatMoney(product.price)}`}
        >
          Add to cart <Plus className="h-4 w-4" />
        </button>
        <p className="mt-2 text-center text-[11px] text-muted">
          {product.kind === "kit"
            ? "Free shipping included · Ships in 1–2 business days"
            : `Ships for ${formatMoney(FLAT_SHIPPING)} · Free over ${formatMoney(
                FREE_SHIPPING_THRESHOLD,
              )}`}
        </p>
      </div>
    </article>
  );
}
