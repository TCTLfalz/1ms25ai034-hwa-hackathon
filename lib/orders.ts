import { CartLine, priceCart } from "@/lib/products";

export type OrderCustomer = {
  email: string;
  firstName: string;
  lastName: string;
};

export type OrderShipping = {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  createdAt: string;
  status: "confirmed";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: OrderCustomer | null;
  shippingAddress: OrderShipping | null;
  payment: { method: "card"; last4: string } | null;
};

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateOrderId(): string {
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `NP-${suffix}`;
}

export function buildOrder(
  lines: CartLine[],
  customer: OrderCustomer | null,
  shippingAddress: OrderShipping | null,
  last4: string | null,
): Order {
  const totals = priceCart(lines);

  return {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    status: "confirmed",
    items: totals.lines.map((line) => ({
      id: line.product.id,
      name: line.product.name,
      price: line.product.price,
      qty: line.qty,
      lineTotal: line.lineTotal,
    })),
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    total: totals.total,
    customer,
    shippingAddress,
    payment: last4 ? { method: "card", last4 } : null,
  };
}

export function formatOrderDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function estimatedDelivery(iso: string): string {
  const from = new Date(iso);
  const start = new Date(from);
  start.setDate(start.getDate() + 5);
  const end = new Date(from);
  end.setDate(end.getDate() + 7);

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${formatter.format(start)} – ${formatter.format(end)}`;
}
