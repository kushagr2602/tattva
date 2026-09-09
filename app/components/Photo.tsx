"use client";

import { useState, type ReactNode } from "react";

// Shows the image when `src` is set (server already verified the file exists),
// otherwise renders `fallback`. onError is a cheap safety net for a bad file.
export default function Photo({
  src, alt, fallback, fill, width, height, className, fit = "cover",
}: {
  src: string; alt: string; fallback: ReactNode;
  fill?: boolean; width?: number; height?: number; className?: string;
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src} alt={alt}
      width={fill ? undefined : width} height={fill ? undefined : height}
      className={className} loading="lazy"
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: fit } : undefined}
      onError={() => setFailed(true)}
    />
  );
}
