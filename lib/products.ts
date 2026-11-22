export type ProductAccent = "clay" | "sage" | "honey";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  description: string;
  includes: string[];
  accent: ProductAccent;
  pods: number;
  kind: "kit" | "refill";
};

export const PRODUCTS: Product[] = [
  {
    id: "starter-kit",
    name: "Starter Kit",
    tagline: "The first trail",
    price: 8999,
    description:
      "Three pods, three scents, and a lifetime of new routes. The easiest way to find out how nose-driven your dog really is.",
    includes: [
      "3 wireless scent pods",
      "3 sealed starter cartridges",
      "USB-C charging dock",
      "Free access to the Nosy Paws app",
      "Quick-start trail guide",
    ],
    accent: "clay",
    pods: 3,
    kind: "kit",
  },
  {
    id: "pro-kit",
    name: "Pro Kit",
    tagline: "The whole-home hunt",
    price: 12999,
    badge: "Most popular",
    description:
      "Five pods for longer, more surprising trails through every room. Built for dogs who have mastered the basics.",
    includes: [
      "5 wireless scent pods",
      "6 sealed starter cartridges",
      "USB-C charging dock",
      "Free access to the Nosy Paws app",
      "Quick-start trail guide",
    ],
    accent: "sage",
    pods: 5,
    kind: "kit",
  },
  {
    id: "refill-pack",
    name: "Scent Refill Pack",
    tagline: "Keep the trail fresh",
    price: 1299,
    description:
      "Six sealed cartridges across three scents your dog will chase. Swap them in seconds, with no mess and no guesswork.",
    includes: [
      "2 × Chicken & Herb",
      "2 × Peanut Butter",
      "2 × Cedar Trail",
      "Sealed, mess-free cartridges",
      "Fits every Nosy Paws pod",
    ],
    accent: "honey",
    pods: 0,
    kind: "refill",
  },
];

export const FREE_SHIPPING_THRESHOLD = 1999;
export const FLAT_SHIPPING = 99;

export type CartLine = { id: string; qty: number };

export type PricedLine = CartLine & {
  product: Product;
  lineTotal: number;
};

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function priceCart(lines: CartLine[]) {
  const priced: PricedLine[] = [];

  for (const line of lines) {
    const product = getProduct(line.id);
    if (!product) continue;

    const qty = Math.max(1, Math.min(20, Math.trunc(line.qty)));
    priced.push({ ...line, qty, product, lineTotal: product.price * qty });
  }

  const subtotal = priced.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping =
    priced.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : FLAT_SHIPPING;
  const total = subtotal + shipping;

  return { lines: priced, subtotal, shipping, total };
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
