"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

/** Renders tutor answers: markdown (headings, lists, bold) and LaTeX math ($...$, $$...$$). */
export function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="space-y-3 [&_h1]:text-lg [&_h2]:text-lg [&_h3]:text-base [&_h1]:font-black [&_h2]:font-black [&_h3]:font-black [&_h3]:text-emerald-900 [&_h3]:pt-2 [&_ul]:list-disc [&_ul]:pr-5 [&_ol]:list-decimal [&_ol]:pr-5 [&_li]:my-1 [&_strong]:font-black [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:rounded [&_.katex]:text-[1.05em] [&_.katex-display]:overflow-x-auto [&_.katex-display]:py-1">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
