"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import CopyButton from "./CopyButton";

import { getSavedReport } from "@/lib/report-storage";
import { generateLaunchKit, LaunchKit } from "@/lib/launch-kit-generator";

/*
  LaunchKitPage shows Devpost-ready content.

  It loads the latest report from localStorage,
  generates pitch content from that report,
  and lets the user copy each section.
*/
export default function LaunchKitPage() {
  const [kit, setKit] = useState<LaunchKit | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedReport = getSavedReport();

    if (savedReport) {
      setKit(generateLaunchKit(savedReport));
    }
  }, []);

  if (!kit) {
    return (
      <main className="min-h-screen bg-[#05070c] text-white">
        <Sidebar />

        <section className="min-h-screen p-4 sm:p-5 lg:ml-[280px]">
          <Topbar />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <h1 className="text-2xl font-bold">No Launch Kit Found</h1>

            <p className="mt-3 text-slate-400">
              Please validate a domain first.
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-400 px-6 py-3 font-semibold text-white"
            >
              Go to Dashboard
            </button>
          </div>
        </section>
      </main>
    );
  }

  const sections = [
    ["Project Name", kit.projectName],
    ["Elevator Pitch", kit.elevatorPitch],
    ["Inspiration", kit.inspiration],
    ["What It Does", kit.whatItDoes],
    ["How We Built It", kit.howWeBuiltIt],
    ["Challenges We Ran Into", kit.challenges],
    ["Accomplishments That We Are Proud Of", kit.accomplishments],
    ["What’s Next For Validom", kit.whatsNext],
    ["Demo Video Script", kit.demoVideoScript],
    ["Landing Page Copy", kit.landingPageCopy],
  ];

  return (
    <main className="min-h-screen bg-[#05070c] text-white">
      <Sidebar />

      <section className="min-h-screen p-4 sm:p-5 lg:ml-[280px]">
        <Topbar />

        {/* Launch Kit Header */}
        <div className="mb-6 rounded-3xl border border-yellow-500/25 bg-gradient-to-br from-[#0b1b38] via-[#071827] to-[#062c25] p-8 shadow-2xl shadow-cyan-500/5">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-300">
            Devpost Launch Kit
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
            Ready-to-Copy Submission Pack
          </h1>

          <p className="mt-3 max-w-3xl text-slate-300">
            Use these sections directly in Devpost. Edit lightly after your
            final demo, screenshots, and deployment are ready.
          </p>
        </div>

        <div className="space-y-5">
          {sections.map(([title, content]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:border-cyan-400/20"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <CopyButton text={content} />
              </div>

              <div className="whitespace-pre-line rounded-xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-slate-300">
                {content}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

