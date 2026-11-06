"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/Button";

const links = [
  { href: "#about", label: "About" },
  { href: "#value", label: "Value" },
  { href: "#steering", label: "Steering" },
  { href: "#timeline", label: "Journey" },
  { href: "#governance", label: "Governance" },
  { href: "#architecture", label: "Architecture" },
  { href: "#lessons", label: "Lessons" },
  { href: "#team", label: "Team" },
];

/** Sticky full-width header with a frosted surface, AGENCY style. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 site-header border-b backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#hero" className="flex items-center" aria-label="Credit Assist home">
          <Logo id="ca-logo-nav" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-4 text-sm font-medium lg:flex xl:gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-purple after:transition-transform hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
          <Button asChild>
            <a href="#status">Current status</a>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle colour theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border)] transition-colors hover:bg-surface-muted"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} className="h-5 w-5" />
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-medium lg:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        aria-label="Mobile"
        className={cn(
          "absolute right-4 top-full mt-2 w-56 gap-1 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2 text-sm shadow-xl lg:hidden",
          open ? "grid" : "hidden",
        )}
      >
        {[...links, { href: "#status", label: "Status" }].map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 hover:bg-surface-muted"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
