"use client";

import { useState } from "react";
import type { Book } from "@/lib/data";
import { QtySelector } from "@/components/ui/QtySelector";
import { AddToBagButton } from "@/components/ui/AddToBagButton";
import { Button } from "@/components/ui/Button";

export default function BookPurchaseActions({ book }: { book: Book }) {
  const [qty, setQty] = useState(1);

  return (
    <>
      <QtySelector qty={qty} onChange={setQty} />
      <AddToBagButton book={book} qty={qty} size="lg" />
      <Button variant="accent" href={`/checkout?book=${book.id}`} className="w-full">
        Buy now
      </Button>
    </>
  );
}