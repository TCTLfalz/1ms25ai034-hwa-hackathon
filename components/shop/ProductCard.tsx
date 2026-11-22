"use client";

import type { Product } from "@/lib/products";
import { formatMoney } from "@/lib/products";
import { useCart } from "@/components/cart/CartProvider";
import ProductVisual from "@/components/shop/ProductVisual";
import { Check, Plus } from "@/components/ui/Icons";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="group flex flex-col rounded-[2rem] border border-ink/10 bg-white/80 p-3 shadow-card backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-sand via-[#F8F1E6] to-oat/60 p-4">
        {product.badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-ink px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-cream">
            {product.badge}
          </span>
        )}
        <ProductVisual product={product} />
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
            ${product.price}
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
            : "Ships for $6.95 · Free over $75"}
        </p>
      </div>
    </article>
  );
}
