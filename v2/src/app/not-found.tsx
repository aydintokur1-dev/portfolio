import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Cat } from "@/components/Cat";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col">
      <div className="flex flex-1 flex-col justify-center px-[var(--edge)] pt-24">
        <div className="flex items-end gap-4"><Cat size={54} /><p className="t-label text-[var(--faint)]">[ 404 — NOT FOUND ]</p></div>
        <h1 className="t-display t-display-xl mt-6 max-w-[14ch]">
          This page didn&apos;t survive contact with <em className="serif-accent text-[var(--accent)]">production.</em>
        </h1>
        <Link href="/" className="pill t-label mt-10 inline-flex w-fit text-[var(--ink)]">
          ← Back to safety
        </Link>
      </div>
      <Footer />
    </main>
  );
}
