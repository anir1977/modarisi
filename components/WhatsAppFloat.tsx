import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/contact";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 left-4 z-50 inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/25 transition-colors hover:bg-emerald-600 md:bottom-6"
      aria-label="تواصل معنا عبر WhatsApp"
    >
      <MessageCircle size={18} strokeWidth={2.4} />
      <span className="hidden sm:inline">سولنا عبر WhatsApp</span>
    </a>
  );
}
