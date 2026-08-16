"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function LoadMore({
  children,
  initial = 8,
  step = 8,
}: {
  children: ReactNode[];
  initial?: number;
  step?: number;
}) {
  const [visible, setVisible] = useState(initial);

  if (children.length === 0) return null;

  const slice = children.slice(0, visible);

  return (
    <>
      <>{slice}</>
      {visible < children.length ? (
        <div className="col-span-full mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="btn-outline"
          >
            Load more
            <ChevronDown size={16} />
          </button>
        </div>
      ) : null}
    </>
  );
}