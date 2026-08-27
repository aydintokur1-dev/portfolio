"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { hasGateHint, isGated, openGate } from "@/lib/gate-client";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { slug: string };

/**
 * A link to a case study. Open studies are plain links; a locked one opens
 * the password modal in place instead of leaving the page. Modified clicks
 * (new tab, etc.) pass through — the proxy catches those on arrival.
 */
export function GateLink({ slug, onClick, children, ...rest }: Props) {
  const href = `/work/${slug}`;

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (!isGated(slug) || hasGateHint()) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    openGate(href);
  };

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
