"use client";

import { Download, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

/*
  These are the launch assets Validom prepares for the user.

  In Phase 3, the Generate Launch Kit button opens
  the real Launch Kit page.
*/
const launchKitItems = [
  "Executive Summary",
  "One-Pager Pitch Deck",
  "Market Research Report",
  "Devpost Submission Pack",
];

export default function LaunchKit() {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-cyan-400/20">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-white">Launch Kit / Devpost Pitch</h3>
        <Rocket size={18} className="text-emerald-300" />
      </div>

      <div className="space-y-3">
        {launchKitItems.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 transition-all duration-200 hover:border-cyan-400/30 hover:bg-black/30"
          >
            <span className="text-sm font-medium text-slate-200">{item}</span>
            <Download size={16} className="text-slate-400" />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => router.push("/launch-kit")}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 transition-all duration-200 hover:scale-[1.01] hover:shadow-cyan-500/20"
      >
        <Rocket size={16} />
        Generate Launch Kit
      </button>
    </div>
  );
}


