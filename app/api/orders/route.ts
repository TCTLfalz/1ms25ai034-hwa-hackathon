import { NextResponse } from "next/server";
import {
  PRODUCTS,
  getProduct,
  type CartLine,
} from "@/lib/products";
import {
  buildOrder,
  type OrderCustomer,
  type OrderShipping,
} from "@/lib/orders";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: CORS_HEADERS });
}

function cleanString(value: unknown, max = 200): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function normalizeItems(raw: unknown): CartLine[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 20) {
    return null;
  }

  const merged = new Map<string, number>();

  for (const entry of raw) {
    let id: unknown;
    let qtyRaw: unknown = 1;

    if (typeof entry === "string") {
      id = entry;
    } else if (entry && typeof entry === "object") {
      const record = entry as Record<string, unknown>;
      id = record.id ?? record.productId;
      qtyRaw = record.quantity ?? record.qty ?? 1;
    }

    if (typeof id !== "string" || !getProduct(id)) {
      return null;
    }

    const qty = Math.trunc(Number(qtyRaw));
    if (!Number.isFinite(qty) || qty < 1 || qty > 20) {
      return null;
    }

    merged.set(id, Math.min(20, (merged.get(id) ?? 0) + qty));
  }

  return Array.from(merged, ([id, qty]) => ({ id, qty }));
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  return json({
    ok: true,
    name: "Nosy Paws Orders API",
    description:
      "Create a demo order by POSTing a JSON body with an items array. Totals are calculated server-side. No payment is taken.",
    endpoint: "POST /api/orders",
    exampleBody: {
      items: [{ id: "starter-kit", quantity: 1 }],
      customer: {
        email: "sam@example.com",
        firstName: "Sam",
        lastName: "Rivera",
      },
      shipping: {
        address1: "12, MG Road",
        city: "Bengaluru",
        state: "KA",
        zip: "560001",
        country: "India",
      },
    },
    products: PRODUCTS.map(({ id, name, price }) => ({ id, name, price })),
  });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json(
      { ok: false, error: "Request body must be valid JSON." },
      400,
    );
  }

  const data =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};

  const items = normalizeItems(data.items);

  if (!items) {
    return json(
      {
        ok: false,
        error:
          "Provide a non-empty items array with valid product ids and quantities between 1 and 20.",
        validProductIds: PRODUCTS.map((product) => product.id),
      },
      400,
    );
  }

  const customerRaw =
    data.customer && typeof data.customer === "object"
      ? (data.customer as Record<string, unknown>)
      : null;
  const email = cleanString(customerRaw?.email, 160);
  const customer: OrderCustomer | null = email
    ? {
        email,
        firstName: cleanString(customerRaw?.firstName, 80) || "Guest",
        lastName: cleanString(customerRaw?.lastName, 80) || "Shopper",
      }
    : null;

  const shippingRaw =
    data.shipping && typeof data.shipping === "object"
      ? (data.shipping as Record<string, unknown>)
      : null;
  const address1 = cleanString(shippingRaw?.address1, 160);
  const city = cleanString(shippingRaw?.city, 80);
  const state = cleanString(shippingRaw?.state, 80);
  const zip = cleanString(shippingRaw?.zip, 20);

  let shippingAddress: OrderShipping | null = null;
  if (shippingRaw && (address1 || city || zip)) {
    shippingAddress = {
      address1: address1 || "—",
      address2: cleanString(shippingRaw.address2, 160) || undefined,
      city: city || "—",
      state: state || "—",
      zip: zip || "—",
      country: cleanString(shippingRaw.country, 80) || "India",
    };
  }

  const paymentRaw =
    data.payment && typeof data.payment === "object"
      ? (data.payment as Record<string, unknown>)
      : null;
  const last4Digits = cleanString(paymentRaw?.last4, 8).replace(/\D/g, "");
  const last4 = last4Digits.length >= 4 ? last4Digits.slice(-4) : null;

  const order = buildOrder(items, customer, shippingAddress, last4);

  return json({ ok: true, order }, 201);
}
