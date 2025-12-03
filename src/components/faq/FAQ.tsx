"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/i18n/getDictionary";

interface FAQProps {
    dict: Dictionary;
}

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
                onClick={onClick}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-medium text-gray-900 pr-4">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FAQ({ dict }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqItems = [
        { question: dict.faq.q1, answer: dict.faq.a1 },
        { question: dict.faq.q2, answer: dict.faq.a2 },
        { question: dict.faq.q3, answer: dict.faq.a3 },
        { question: dict.faq.q4, answer: dict.faq.a4 },
        { question: dict.faq.q5, answer: dict.faq.a5 },
    ];

    return (
        <section className="py-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {dict.faq.title}
            </h2>
            <div className="space-y-3 max-w-md mx-auto">
                {faqItems.map((item, index) => (
                    <FAQItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                ))}
            </div>
        </section>
    );
}
