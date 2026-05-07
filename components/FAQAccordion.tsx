"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[var(--color-bg)] transition-colors"
          >
            <span className="font-semibold text-[var(--color-accent)] pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-[var(--color-muted)] flex-shrink-0 transition-transform",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-[var(--color-muted)]">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
