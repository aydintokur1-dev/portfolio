"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The instrument chrome: wordmark top-left; nav, live Istanbul clock and
 * status top-right; scroll telemetry bottom. Fixed, hairline, mono.
 */
export function Hud() {
  const pathname = usePathname();

  // On the homepage the wordmark is a hard reset: full reload, back to the
  // top, hash dropped. Elsewhere it's an ordinary link home.
  const onWordmark = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    e.preventDefault();
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    window.location.href = "/";
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-[var(--edge)] pt-5"
        style={{ pointerEvents: "none" }}
      >
        <Link href="/" onClick={onWordmark} className="hud-pill t-label" style={{ pointerEvents: "auto" }}>
          <span className="text-[var(--ink)]">Aydın</span>
          <span className="hidden text-[var(--faint)] sm:inline">/ design engineer</span>
        </Link>

        <div className="flex items-center gap-2.5" style={{ pointerEvents: "auto" }}>
          <nav className="hud-pill t-label inline-flex items-center gap-3 sm:gap-4" aria-label="Site">
            <Link className="roll" href="/#work"><span className="roll-in"><span>Work</span><span aria-hidden>Work</span></span></Link>
            <Link className="roll" href="/#about"><span className="roll-in"><span>About</span><span aria-hidden>About</span></span></Link>
            <Link className="roll" href="/#contact"><span className="roll-in"><span>Contact</span><span aria-hidden>Contact</span></span></Link>
          </nav>
          <Clock />
          <span className="hud-pill t-label diode hidden text-[var(--ink)] sm:inline-flex">
            <span className="hidden sm:inline">Open to work</span>
            <span className="sm:hidden">Open</span>
          </span>
        </div>
      </header>

      <Telemetry />
    </>
  );
}

function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Europe/Istanbul",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hud-pill t-label hidden text-[var(--muted)] lg:inline-flex" suppressHydrationWarning>
      IST&nbsp;{time ?? "--:--:--"}
    </span>
  );
}

function Telemetry() {
  const [pct, setPct] = useState(0);
  const [section, setSection] = useState("HELLO");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-hud]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSection(e.target.getAttribute("data-hud") ?? "");
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="t-label pointer-events-none fixed inset-x-0 bottom-0 z-50 hidden items-center justify-between px-[var(--edge)] pb-4 text-[var(--faint)] md:flex"
    >
      <span>SEC // {section}</span>
      <span className="flex items-center gap-3">
        <span className="relative block h-px w-24 bg-[var(--hairline)]">
          <span
            className="absolute inset-y-0 left-0 bg-[var(--accent)]"
            style={{ width: `${pct}%`, boxShadow: "0 0 8px rgba(var(--accent-rgb),.6)" }}
          />
        </span>
        SCROLL {String(pct).padStart(3, "0")}%
      </span>
    </div>
  );
}
