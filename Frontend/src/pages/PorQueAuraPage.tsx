import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { WhyAuraSection } from '../components/WhyAuraSection';

export const PorQueAuraPage: React.FC = () => {
  return (
    <main className="grow">
      {/* Banner de Cabecera */}
      <section className="bg-[#0B192C] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-red-400 mb-4 tracking-wider uppercase">
            <Award size={14} />
            <span>Diferenciales de Valor</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            ¿Por qué <span className="text-[#DC2626]">Aura Corporativa</span>?
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Combinamos solidez jurídica ante Sunafil y Sunat, capacidad de respuesta inmediata y acompañamiento personalizado para blindar su operación.
          </p>
        </div>
      </section>

      {/* Sección con Métricas y Pilares */}
      <WhyAuraSection />

      {/* Respaldo adicional */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center mb-4">
                <ShieldCheck size={22} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Seguridad Contractual</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Supervisión jurídica constante de cada vínculo laboral, contratos registrados y pagos de beneficios conforme a ley.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center mb-4">
                <CheckCircle2 size={22} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Atención Ejecutiva</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Un ejecutivo de cuenta asignado para coordinar de manera directa y solucionar cualquier eventualidad de su operación.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center mb-4">
                <Award size={22} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Escalabilidad Flexible</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Capacidad de absorción de picos de demanda y proyectos temporales sin sobrecargar la estructura interna de su empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Inferior */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
            Compruebe la diferencia de operar con respaldo profesional
          </h3>
          <p className="text-slate-600 text-base max-w-xl mx-auto mb-8">
            Solicite una consulta con nuestro equipo directivo y reciba una evaluación preliminar de sus procesos operativos.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-base rounded-xl transition-all shadow-md cursor-pointer"
          >
            <span>Agendar una Asesoría</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PorQueAuraPage;
