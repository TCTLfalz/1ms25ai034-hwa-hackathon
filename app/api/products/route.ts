import { NextResponse } from "next/server";
import {
  FLAT_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  PRODUCTS,
} from "@/lib/products";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      currency: "USD",
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      flatShipping: FLAT_SHIPPING,
      products: PRODUCTS,
    },
    { headers: CORS_HEADERS },
  );
}
