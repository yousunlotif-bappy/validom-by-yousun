import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Search Bar */}
      <div className="flex h-14 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 transition-all duration-200 focus-within:border-cyan-400/40 focus-within:bg-white/[0.07]">
        <Search size={20} className="shrink-0 text-slate-400" />

        <input
          type="text"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
          placeholder="Search validations, domains, or insights..."
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Button */}
        <button
          type="button"
          className="relative h-14 w-14 shrink-0 rounded-2xl border border-white/10 bg-white/5 transition-all duration-200 hover:border-cyan-400/30 hover:bg-white/10"
          aria-label="Open notifications"
        >
          <Bell className="mx-auto text-slate-200" size={20} />

          <span className="absolute right-3 top-2 grid h-5 w-5 place-items-center rounded-full bg-yellow-400 text-xs font-bold text-black">
            3
          </span>
        </button>

        {/* Workspace Card */}
        <div className="min-w-[170px] rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
          <p className="text-sm font-semibold text-white">Yousun Labs</p>
          <p className="text-xs text-slate-400">Workspace</p>
        </div>
      </div>
    </header>
  );
}

