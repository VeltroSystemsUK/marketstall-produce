"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";

export default function ViewToggle({ view }: { view: "grid" | "list" }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function setView(v: "grid" | "list") {
    const params = new URLSearchParams(searchParams.toString());
    if (v === "grid") params.delete("view");
    else params.set("view", "list");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
      <button
        onClick={() => setView("grid")}
        className={`rounded-md p-1.5 transition-colors ${
          view === "grid"
            ? "bg-white shadow-sm text-forest-700"
            : "text-gray-400 hover:text-gray-600"
        }`}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
      <button
        onClick={() => setView("list")}
        className={`rounded-md p-1.5 transition-colors ${
          view === "list"
            ? "bg-white shadow-sm text-forest-700"
            : "text-gray-400 hover:text-gray-600"
        }`}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}
