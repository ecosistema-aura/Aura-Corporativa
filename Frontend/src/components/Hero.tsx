import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero_corporate.jpg';

export const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[520px] lg:min-h-[580px] flex items-center justify-start bg-[#0D1B2A] text-white overflow-hidden"
    >
      {/* Background Corporate Image with clean overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Aura Corporativa"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-[#0D1B2A]/90 to-transparent" />
        <div className="absolute right-10 top-24 hidden h-56 w-56 rounded-full border border-white/10 lg:block" />
        <div className="absolute right-24 top-40 hidden h-24 w-24 rounded-full border border-[#DC2626]/30 lg:block" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-300 reveal-up delay-1">
            <span className="h-px w-10 bg-[#DC2626]" />
            <span>Confianza que impulsa</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white reveal-up delay-2">
            Reduce tu carga operativa,<br className="hidden sm:inline" /> enfócate en tu negocio
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-200 font-normal leading-relaxed reveal-up delay-3">
            Soluciones integrales en Tercerización y Outsourcing Empresarial
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 reveal-up delay-4">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-bold text-white bg-[#DC2626] hover:bg-red-700 active:scale-95 rounded-md transition-all shadow-md cursor-pointer"
            >
              Solicita una Asesoría
            </Link>
            <Link
              to="/servicios"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 active:scale-95 rounded-md transition-all shadow-md cursor-pointer"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

