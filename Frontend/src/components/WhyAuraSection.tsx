import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShieldCheck, Target, Clock } from 'lucide-react';
import whyAuraBg from '../assets/por_que_aura.jpg';

export const WhyAuraSection: React.FC = () => {
  const metrics = [
    { value: '100%', label: 'Cumplimiento Legal', sub: 'Sunafil & Sunat' },
    { value: '+98%', label: 'Satisfacción', sub: 'En servicios B2B' },
    { value: '24-48h', label: 'Respuesta Operativa', sub: 'Atención continua' },
    { value: '0%', label: 'Contingencias', sub: 'Blindaje integral' },
  ];

  const pillars = [
    {
      icon: DollarSign,
      title: 'Ahorro Operativo y Eficiencia',
      desc: 'Optimizamos tus recursos y reducimos costos fijos de nómina, contratación e infraestructura con presupuestos claros y transparentes.',
    },
    {
      icon: ShieldCheck,
      title: 'Respaldo Legal y Blindaje Tributario',
      desc: 'Supervisión rigurosa de contratos laborales y aportes de ley, asegurando cero contingencias y total tranquilidad ante Sunafil y Sunat.',
    },
    {
      icon: Target,
      title: 'Enfoque Estratégico del Negocio',
      desc: 'Liberamos la carga operativa del personal para que tu equipo directivo se concentre al 100% en la rentabilidad y el crecimiento comercial.',
    },
    {
      icon: Clock,
      title: 'Atención Ágil y Cobertura Continua',
      desc: 'Ejecutivos de cuenta asignados con monitoreo permanente y resolución inmediata de incidencias para que tus operaciones nunca se detengan.',
    },
  ];

  return (
    <section id="por-que-aura" className="relative overflow-hidden py-24 text-white">
      {/* Background Image with Balanced Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={whyAuraBg}
          alt="Por qué elegir Aura Corporativa"
          className="w-full h-full object-cover object-center brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#081526]/50 via-[#0B192C]/65 to-[#081526]/60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-14 reveal-up">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#DC2626]" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            ¿Por qué elegir <span className="text-[#DC2626]">Aura Corporativa</span>?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ventajas estratégicas comprobadas que protegen tu operación y potencian la productividad de tu organización.
          </p>
        </div>

        {/* 1. Concise Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 pb-10 border-b border-white/10 reveal-stagger">
          {metrics.map((m, index) => (
            <div key={index} className="text-center reveal-up">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#DC2626] tracking-tight">
                {m.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-1">
                {m.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 2. Structured Information in Paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 reveal-stagger">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4 sm:gap-5 text-left reveal-up">
                <div className="w-12 h-12 rounded-xl bg-[#DC2626]/20 border border-[#DC2626]/40 text-[#DC2626] flex items-center justify-center shrink-0 mt-1">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Bottom Assurance Callout */}
        <div className="bg-[#0B192C]/90 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/10 backdrop-blur-md reveal-up delay-2">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold mb-2">
              Transformamos la gestión de talento en una ventaja competitiva
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Diseñamos propuestas a la medida de tu sector y volumen de colaboradores, garantizando continuidad y tranquilidad.
            </p>
          </div>
          <Link
            to="/contacto"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Solicitar Asesoría
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyAuraSection;


