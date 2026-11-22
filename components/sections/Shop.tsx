import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import { Shield, Sparkle, Truck } from "@/components/ui/Icons";

const REASSURANCE = [
  {
    icon: Truck,
    title: "Free shipping over $75",
    copy: "Kits ship free, in 1–2 business days.",
  },
  {
    icon: Shield,
    title: "30-day happy-nose guarantee",
    copy: "If your dog doesn't take to it, we'll make it right.",
  },
  {
    icon: Sparkle,
    title: "Vet-reviewed scents",
    copy: "Sealed cartridges, made for sensitive noses.",
  },
];

export default function Shop() {
  return (
    <section id="shop" className="section-pad scroll-mt-24 bg-cream">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Shop</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Find your starting trail.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Every kit includes the app, a USB-C charging dock, and a quick-start
            guide. Add pods any time as your dog levels up.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 grid gap-5 rounded-3xl border border-ink/10 bg-white/60 p-6 sm:grid-cols-3 sm:p-8">
          {REASSURANCE.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-sand text-clay">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
