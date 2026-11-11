import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShieldCheck, Target, Clock, ArrowRight } from 'lucide-react';

interface WhyAuraSectionProps {
  showTitle?: boolean;
  theme?: 'light' | 'dark';
}

export const WhyAuraSection: React.FC<WhyAuraSectionProps> = ({ 
  showTitle = false, 
  theme = 'light' 
}) => {
  const isDark = theme === 'dark';

  const metrics = [
    { value: '100%', label: 'Cumplimiento Legal', sub: 'Sunafil & Sunat al día' },
    { value: '+98%', label: 'Satisfacción B2B', sub: 'Servicios continuos' },
    { value: '24-48h', label: 'Respuesta Operativa', sub: 'Atención y reemplazos' },
    { value: '0%', label: 'Contingencias', sub: 'Blindaje integral formal' },
  ];

  const pillars = [
    {
      icon: DollarSign,
      title: 'Ahorro Operativo & Eficiencia',
      desc: 'Optimizamos sus recursos y reducimos costos fijos de nómina, contratación e infraestructura con presupuestos claros, predecibles y sin sobrecostos.',
    },
    {
      icon: ShieldCheck,
      title: 'Respaldo Legal & Blindaje Tributario',
      desc: 'Supervisión rigurosa de contratos laborales y aportes de ley, asegurando cero contingencias y total tranquilidad jurídica ante fiscalizaciones de Sunafil.',
    },
    {
      icon: Target,
      title: 'Enfoque Estratégico del Negocio',
      desc: 'Liberamos a su equipo directivo de la carga operativa para que se concentre al 100% en la rentabilidad comercial y el crecimiento de su empresa.',
    },
    {
      icon: Clock,
      title: 'Atención Ágil & Cobertura Continua',
      desc: 'Ejecutivos de cuenta asignados con monitoreo permanente y resolución inmediata de incidencias para asegurar que sus operaciones nunca se detengan.',
    },
  ];

  return (
    <section 
      id="por-que-aura" 
      className={`relative overflow-hidden py-20 lg:py-28 border-b ${
        isDark ? 'bg-[#071321] text-white border-slate-800' : 'bg-white text-slate-800 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title opcional */}
        {showTitle && (
          <div className="text-center mb-16 reveal-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className={`text-xs sm:text-sm font-semibold tracking-wider uppercase ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                Propuesta de Valor
              </span>
              <span className="h-0.5 w-10 bg-[#DC2626]" />
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ¿Por qué elegir <span className="text-[#DC2626]">Aura Corporativa</span>?
            </h2>
            <p className={`mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Ventajas estratégicas comprobadas que protegen su operación y potencian la productividad de su organización.
            </p>
          </div>
        )}

        {/* 1. Métricas Corporativas (Grandes y Espaciosas, sin cards apretadas) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 pb-14 border-b border-slate-200/80 reveal-stagger">
          {metrics.map((m, index) => (
            <div 
              key={index} 
              className={`text-left p-6 sm:p-8 rounded-xl border transition-all reveal-up ${
                isDark 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#DC2626] tracking-tight">
                {m.value}
              </div>
              <div className={`text-base font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {m.label}
              </div>
              <div className={`text-xs sm:text-sm mt-1 font-normal ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 2. Cuatro Pilares Estratégicos en Distribución Amplia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 mb-16 reveal-stagger">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-5 text-left reveal-up">
                <div className="w-14 h-14 rounded-xl bg-red-600/10 border border-red-500/20 text-[#DC2626] flex items-center justify-center shrink-0 mt-1">
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Bloque de Compromiso Corporativo Ancho */}
        <div className={`rounded-xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border shadow-xl reveal-up ${
          isDark 
            ? 'bg-[#0A1828] border-white/15' 
            : 'bg-[#071321] text-white border-slate-800'
        }`}>
          <div className="max-w-3xl text-left">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
              Transformamos la gestión de personal en una ventaja competitiva
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Diseñamos propuestas a la medida de su sector y volumen de colaboradores, garantizando continuidad operativa y tranquilidad legal.
            </p>
          </div>
          <Link
            to="/contacto"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-base rounded-md transition-all shadow-md cursor-pointer"
          >
            <span>Solicitar Asesoría</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyAuraSection;
