import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, MessageSquareText, Phone } from 'lucide-react';
import { FaqSection } from '../components/FaqSection';
import { siteConfig } from '../config/siteConfig';

export const FaqPage: React.FC = () => {
  return (
    <main className="grow">
      {/* Banner de Cabecera */}
      <section className="bg-[#0B192C] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-red-400 mb-4 tracking-wider uppercase">
            <HelpCircle size={14} />
            <span>Centro de Ayuda</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Preguntas <span className="text-[#DC2626]">Frecuentes</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Resolvemos las dudas más habituales sobre nuestros esquemas de tercerización, cumplimiento legal y metodología de trabajo.
          </p>
        </div>
      </section>

      {/* Preguntas Frecuentes Acordeón */}
      <FaqSection />

      {/* Banner de Soporte Directo */}
      <section className="bg-slate-50 py-16 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-[#DC2626] mx-auto flex items-center justify-center mb-4">
              <MessageSquareText size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              ¿Tiene alguna duda específica para su sector?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-6">
              Cada negocio tiene requerimientos únicos. Nuestro equipo legal y operativo está disponible para atender sus consultas de forma personalizada.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Enviar Consulta
              </Link>
              <a
                href={'tel:' + siteConfig.contact.phone.value}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-all"
              >
                <Phone size={16} className="text-[#DC2626]" />
                <span>Llamar: {siteConfig.contact.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FaqPage;
