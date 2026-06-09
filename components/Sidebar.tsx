import Image from "next/image";

import {
  LayoutDashboard,
  Search,
  Globe,
  ShieldCheck,
  Users,
  Rocket,
  BarChart3,
  Settings,
  Puzzle,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Validations", icon: Search },
  { name: "Research", icon: Globe },
  { name: "Proof Vault", icon: ShieldCheck },
  { name: "Competitors", icon: Users },
  { name: "Launch Kit", icon: Rocket },
  { name: "Reports", icon: BarChart3 },
  { name: "Integrations", icon: Puzzle },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] flex-col border-r border-white/10 bg-[#080d14] p-5 lg:flex">
      {/* Brand Area */}
      <div className="mb-7 flex shrink-0 flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Validom logo"
          width={78}
          height={78}
          className="h-[68px] w-[68px] object-contain"
          priority
        />

        <div className="mt-3 flex items-baseline justify-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            <span className="text-cyan-400">V</span>alidom
          </h1>

          <span className="text-sm font-semibold text-yellow-400">
            by Yousun
          </span>
        </div>
      </div>

      {/* Navigation Area */}
      <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              type="button"
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                item.active
                  ? "border border-blue-400/30 bg-blue-600/30 text-white shadow-lg shadow-blue-500/10"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Pro Plan Card */}
      <div className="mt-5 shrink-0 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-semibold text-white">Pro Plan</p>

          <span className="rounded-full border border-emerald-400/40 px-3 py-1 text-xs font-medium text-emerald-300">
            Active
          </span>
        </div>

        <p className="text-sm text-slate-300">Validations used</p>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[24%] rounded-full bg-emerald-400" />
        </div>

        <p className="mt-3 text-sm text-slate-300">24 / 100</p>
      </div>
    </aside>
  );
}

