"use client";

import { Download } from "lucide-react";
import { ValidationReport } from "@/types/validation";

/*
  DownloadReportButton creates a simple PDF report on the client.

  This fixes the weak point:
  "Downloadable PDF is only browser print."

  We use dynamic import so the PDF library loads only when needed.
*/
type DownloadReportButtonProps = {
  report: ValidationReport;
};

export default function DownloadReportButton({
  report,
}: DownloadReportButtonProps) {
  async function handleDownload() {
    const { jsPDF } = await import("jspdf");

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 14;
    const maxWidth = pageWidth - margin * 2;

    let y = 18;

    function addTitle(text: string) {
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text(text, margin, y);
      y += 10;
    }

    function addHeading(text: string) {
      if (y > 265) {
        pdf.addPage();
        y = 18;
      }

      pdf.setFontSize(13);
      pdf.setFont("helvetica", "bold");
      pdf.text(text, margin, y);
      y += 7;
    }

    function addParagraph(text: string) {
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");

      const lines = pdf.splitTextToSize(text, maxWidth);

      for (const line of lines) {
        if (y > 280) {
          pdf.addPage();
          y = 18;
        }

        pdf.text(line, margin, y);
        y += 5;
      }

      y += 4;
    }

    addTitle("Validom Report");
    addParagraph(`Domain: ${report.domainAnalysis.domain}`);
    addParagraph(`Verdict: ${report.verdict}`);
    addParagraph(`Opportunity Score: ${report.scores.opportunityScore}/100`);

    addHeading("Summary");
    addParagraph(report.summary);

    addHeading("Scores");
    addParagraph(
      `Trust: ${report.scores.trustScore}/100 | Brand: ${report.scores.brandScore}/100 | Market: ${report.scores.marketScore}/100 | Proof: ${report.scores.proofScore}/100 | Domain Fit: ${report.scores.domainFitScore}/100`
    );

    addHeading("Domain Roulette Alignment");
    addParagraph(report.domainRouletteAlignment);

    if (report.aiInsights) {
      addHeading("AI Strategic Analysis");
      addParagraph(report.aiInsights.finalVerdictExplanation);
      addParagraph(report.aiInsights.domainFitAnalysis);
    }

    addHeading("Recommendations");
    report.recommendations.forEach((item, index) => {
      addParagraph(`${index + 1}. ${item}`);
    });

    addHeading("Startup Concepts");
    report.concepts.forEach((concept, index) => {
      addParagraph(
        `${index + 1}. ${concept.title} — ${concept.description} Score: ${concept.score}`
      );
    });

    pdf.save(`validom-report-${report.domainAnalysis.domain}.pdf`);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
}


