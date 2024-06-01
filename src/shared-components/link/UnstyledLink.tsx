import Link, { LinkProps } from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, "href">;
} & React.ComponentPropsWithRef<"a">;

/**
 * No style, and Next optimized.<br/>
 * Use this because if the url is internal,
 * it uses Next/{@link Link} and if external it uses the `a` tag which opens a new tab.<br/>
 * The Next/{@link Link} updates page content <b>without reloading</b>.
 * @author Tymon Woźniak
 */
const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, href, openNewTab, className, nextLinkProps, ...rest }, ref) => {
    // Check is external url
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith("/") && !href.startsWith("#");

    // Render `Next/Link` if internal
    if (!isNewTab) {
      return (
        <Link
          href={href}
          ref={ref}
          className={className}
          {...rest}
          {...nextLinkProps}
        >
          {children}
        </Link>
      );
    }

    // Render external `a` link
    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        {...rest}
        className={cn("cursor-newtab", className)}
      >
        {children}
      </a>
    );
  }
);

export type { UnstyledLinkProps };
export default UnstyledLink;
