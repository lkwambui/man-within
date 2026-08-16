"use client";

import Image from "next/image";
import { useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
};

/**
 * Renders a remote image with a graceful, on-brand fallback if the source
 * ever fails to load (offline, removed asset, etc).
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  width = 800,
  height = 600,
  priority = false,
  sizes,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-sand ${className ?? ""}`}
      >
        <span className="px-6 text-center font-display text-lg font-semibold leading-snug text-forest">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName ?? ""}`}
      />
    </div>
  );
}