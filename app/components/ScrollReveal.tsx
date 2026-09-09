"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Mounted once in the layout: reveals any `.reveal` element as it scrolls in.
// Re-scans on route change so every page animates.
export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
