"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  priceCart,
  getProduct,
  type CartLine,
} from "@/lib/products";

type CartContextValue = {
  lines: CartLine[];
  hydrated: boolean;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (id: string, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "nosypaws.cart.v1";

function clampQty(value: number): number {
  return Math.max(1, Math.min(20, Math.trunc(value)));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const clean: CartLine[] = [];
          for (const entry of parsed) {
            if (!entry || typeof entry.id !== "string") continue;
            if (!getProduct(entry.id)) continue;
            const qty = clampQty(Number(entry.qty) || 1);
            const existing = clean.find((line) => line.id === entry.id);
            if (existing) {
              existing.qty = clampQty(existing.qty + qty);
            } else {
              clean.push({ id: entry.id, qty });
            }
          }
          setLines(clean);
        }
      }
    } catch {
      // Ignore malformed storage.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage may be unavailable (private mode).
    }
  }, [lines, hydrated]);

  const addItem = useCallback((id: string, qty = 1) => {
    if (!getProduct(id)) return;
    setLines((prev) => {
      const existing = prev.find((line) => line.id === id);
      if (existing) {
        return prev.map((line) =>
          line.id === id
            ? { ...line, qty: clampQty(line.qty + qty) }
            : line,
        );
      }
      return [...prev, { id, qty: clampQty(qty) }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((line) => line.id !== id)
        : prev.map((line) =>
            line.id === id ? { ...line, qty: clampQty(qty) } : line,
          ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totals = useMemo(() => priceCart(lines), [lines]);
  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      hydrated,
      count,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      addItem,
      removeItem,
      setQty,
      clearCart,
      isOpen,
      openCart,
      closeCart,
    }),
    [
      lines,
      hydrated,
      count,
      totals,
      addItem,
      removeItem,
      setQty,
      clearCart,
      isOpen,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
