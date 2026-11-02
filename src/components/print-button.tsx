"use client";
import { Download } from "lucide-react";

// Opens the browser print dialog, where the lesson can be saved as a PDF.
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#121322] text-sm font-bold text-[#121322] hover:bg-[#f2b233]/25 transition-colors"
    >
      <Download size={16} aria-hidden="true" /> حفظ الدرس PDF
    </button>
  );
}
