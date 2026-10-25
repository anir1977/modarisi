import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

/** Server-rendered Markdown + LaTeX for lesson content (indexable, no client JS). */
export function RichText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div
      className={`space-y-3 leading-loose text-slate-800 [&_ul]:list-disc [&_ul]:pr-6 [&_ol]:list-decimal [&_ol]:pr-6 [&_li]:my-1.5 [&_strong]:font-bold [&_strong]:text-slate-900 [&_.katex]:text-[1.06em] [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-2 [&_table]:w-full [&_table]:block [&_table]:overflow-x-auto md:[&_table]:table [&_table]:text-sm [&_th]:border [&_td]:border [&_th]:border-slate-200 [&_td]:border-slate-200 [&_th]:p-2 [&_td]:p-2 [&_th]:bg-slate-50 ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
