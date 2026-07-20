"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Link as TransitionLinkBase } from "next-transition-router";

type TransitionLinkProps = React.ComponentProps<typeof TransitionLinkBase>;

function isTransitionRoute(href: string): boolean {
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return false;
  }
  if (href.includes("#")) return false;
  return href.startsWith("/");
}

export function TransitionLink({
  href,
  onMouseEnter,
  onFocus,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const hrefStr = typeof href === "string" ? href : (href.pathname ?? "");

  const prefetch = useCallback(() => {
    if (isTransitionRoute(hrefStr)) {
      router.prefetch(hrefStr);
    }
  }, [router, hrefStr]);

  if (!isTransitionRoute(hrefStr)) {
    return <a href={hrefStr} onClick={onClick} {...props} />;
  }

  return (
    <TransitionLinkBase
      href={href}
      onClick={onClick}
      onMouseEnter={(event) => {
        prefetch();
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        prefetch();
        onFocus?.(event);
      }}
      {...props}
    />
  );
}
