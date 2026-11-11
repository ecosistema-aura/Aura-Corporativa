import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import bannerHero from '../assets/banner_hero_solimano.jpg';

export const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[580px] lg:min-h-[660px] flex items-center bg-[#071321] text-white overflow-hidden"
    >
      {/* Background Corporate Image Full-Bleed (Estilo Grupo Solimano) */}
      <div className="absolute inset-0 z-0">
        <img
          src={bannerHero}
          alt="Aura Corporativa - Gestión y Talento Empresarial"
          className="w-full h-full object-cover object-center lg:object-[center_right]"
        />
        {/* Degradado cinematográfico: oscuro y nítido a la izquierda para el texto, dejando ver la imagen a la derecha */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071321] via-[#071321]/90 lg:via-[#071321]/80 to-[#071321]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-transparent to-transparent lg:hidden" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Línea de acento sobria y corporativa (sin pastillas ni puntos pulsantes) */}
          <div className="flex items-center gap-3 mb-6 reveal-up">
            <span className="h-0.5 w-10 bg-[#DC2626]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-300">
              Gestión Humana & Tercerización Empresarial
            </span>
          </div>

          {/* Título Principal Ejecutivo */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] reveal-up delay-1">
            Impulsamos el crecimiento de su empresa con el{' '}
            <span className="text-[#DC2626]">
              talento idóneo
            </span>
          </h1>

          {/* Subtítulo sobrio y claro */}
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl reveal-up delay-2">
            Brindamos soluciones integrales de tercerización operativa, administración de planillas y gestión de personal con estricto rigor legal ante Sunafil y Sunat en todo el Perú.
          </p>

          {/* Botones Corporativos Limpios (Estilo Solimano) */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 reveal-up delay-3">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#DC2626] hover:bg-red-700 active:scale-95 rounded-md transition-all shadow-lg shadow-red-900/40 cursor-pointer"
            >
              <span>Solicitar Asesoría</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/servicios"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-transparent hover:bg-white hover:text-slate-900 border-2 border-white/80 active:scale-95 rounded-md transition-all cursor-pointer"
            >
              Nuestros Servicios
            </Link>
          </div>

          {/* Barra de Especialidades (Limpia, elegante, tipográfica) */}
          <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300 font-medium tracking-wide reveal-up delay-4">
            <span>Tercerización Operativa</span>
            <span className="text-red-500 font-bold">•</span>
            <span>Administración de Nóminas</span>
            <span className="text-red-500 font-bold">•</span>
            <span>Intermediación Laboral</span>
            <span className="text-red-500 font-bold">•</span>
            <span>Soporte B2B Continuo</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
