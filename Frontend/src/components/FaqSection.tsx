import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../data/servicesData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative overflow-hidden py-20 lg:py-24 bg-[#071321] text-white border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal-up">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-0.5 w-10 bg-[#DC2626]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-300">
              Centro de Ayuda
            </span>
            <span className="h-0.5 w-10 bg-[#DC2626]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Preguntas <span className="text-[#DC2626]">Frecuentes</span>
          </h2>
        </div>

        <div className="space-y-3.5 reveal-stagger">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-white/10 overflow-hidden bg-slate-900/60 shadow-xs transition-all duration-200 hover:border-white/20 reveal-up"
              >
                <div
                  onClick={() => toggleFaq(index)}
                  className="cursor-pointer p-4 sm:p-5 bg-white/5 flex items-center justify-between gap-4 select-none hover:bg-white/10 transition-colors"
                >
                  <h3 className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-[#DC2626]' : 'text-white'}`}>
                    {item.question}
                  </h3>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#DC2626]' : 'text-slate-400'
                    }`}
                  />
                </div>

                {/* Despliegue animado con efecto de deslice suave */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-4 sm:p-5 text-sm sm:text-base text-slate-300 leading-relaxed bg-[#071321] border-t border-white/10">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
