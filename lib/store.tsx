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
import { getBookById, type Book } from "@/lib/data";

export type CartItem = {
  book: Book;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (book: Book, qty?: number) => void;
  remove: (bookId: string) => void;
  updateQty: (bookId: string, qty: number) => void;
  clear: () => void;
  has: (bookId: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "man-within-cart";

type PersistedCart = { bookId: string; qty: number }[];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as PersistedCart;
        setItems(
          stored
            .map((entry) => ({ book: getBook(entry.bookId), qty: entry.qty }))
            .filter((entry): entry is CartItem => Boolean(entry.book)),
        );
      }
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: PersistedCart = items.map((item) => ({
      bookId: item.book.id,
      qty: item.qty,
    }));
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(payload));
    } catch {
      /* storage full or unavailable */
    }
  }, [items, hydrated]);

  const add = useCallback((book: Book, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, qty: Math.min(item.qty + qty, 99) } : item,
        );
      }
      return [...prev, { book, qty }];
    });
  }, []);

  const remove = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((item) => item.book.id !== bookId));
  }, []);

  const updateQty = useCallback((bookId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((item) => item.book.id !== bookId)
        : prev.map((item) =>
            item.book.id === bookId ? { ...item, qty: Math.min(qty, 99) } : item,
          ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback(
    (bookId: string) => items.some((item) => item.book.id === bookId),
    [items],
  );

  const { count, subtotal } = useMemo(() => {
    return {
      count: items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: items.reduce((sum, item) => sum + item.qty * item.book.priceNumber, 0),
    };
  }, [items]);

  const value = useMemo(
    () => ({ items, count, subtotal, add, remove, updateQty, clear, has }),
    [items, count, subtotal, add, remove, updateQty, clear, has],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function getBook(id: string): Book | undefined {
  return getBookById(id);
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Wishlist                                                            */
/* ------------------------------------------------------------------ */

type WishlistContextValue = {
  ids: string[];
  toggle: (bookId: string) => void;
  has: (bookId: string) => boolean;
  remove: (bookId: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

const WISHLIST_KEY = "man-within-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    try {
      const raw = window.localStorage.getItem(WISHLIST_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as string[];
        setIds(Array.isArray(stored) ? stored : []);
      }
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    } catch {
      /* storage full or unavailable */
    }
  }, [ids, hydrated]);

  const toggle = useCallback((bookId: string) => {
    setIds((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId],
    );
  }, []);

  const remove = useCallback((bookId: string) => {
    setIds((prev) => prev.filter((id) => id !== bookId));
  }, []);

  const has = useCallback((bookId: string) => ids.includes(bookId), [ids]);

  const value = useMemo(
    () => ({ ids, toggle, has, remove }),
    [ids, toggle, has, remove],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}