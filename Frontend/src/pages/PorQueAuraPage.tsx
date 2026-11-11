import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  XCircle, 
  CheckCircle2, 
  Search, 
  FileCheck, 
  UserCheck, 
  Activity 
} from 'lucide-react';
import { WhyAuraSection } from '../components/WhyAuraSection';
import porqueSupervision from '../assets/porque_supervision.jpg';
import bannerCorporativo from '../assets/banner_corporativo.jpg';

export const PorQueAuraPage: React.FC = () => {
  const comparisonItems = [
    {
      traditional: 'Riesgo constante de multas graves y contingencias imprevistas ante Sunafil por errores de encuadre legal.',
      aura: '100% blindaje normativo. Contratos registrados, homologados y fiscalizaciones respaldadas con equipo jurídico.'
    },
    {
      traditional: 'Costos laborales ocultos por liquidaciones no provisionadas, descansos médicos y sobrecostos por rotación.',
      aura: 'Tarifa mensual fija, transparente y predecible. Cero pasivos laborales acumulados para su empresa.'
    },
    {
      traditional: 'Demoras prolongadas para cubrir vacantes críticas en picos de demanda o ausencias no programadas.',
      aura: 'Reclutamiento ágil y banco de talento activo. Respuesta y reemplazo operativo en 24 a 48 horas.'
    },
    {
      traditional: 'Sobrecarga extrema del equipo interno de RRHH en tareas operativas de boletas, quejas y asistencia.',
      aura: 'Administración integral de nóminas y un ejecutivo de cuenta exclusivo que atiende directamente en sede.'
    }
  ];

  const methodologySteps = [
    {
      step: '01',
      icon: Search,
      title: 'Diagnóstico Operativo & Legal',
      desc: 'Evaluamos la estructura de sus puestos, perfiles requeridos, nivel de riesgo y marco normativo aplicable para estructurar el servicio formal.'
    },
    {
      step: '02',
      icon: FileCheck,
      title: 'Validación & Contratación',
      desc: 'Filtros rigurosos de antecedentes policiales, pruebas de competencias laborales y formalización contractual registrada ante el MTPE.'
    },
    {
      step: '03',
      icon: UserCheck,
      title: 'Despliegue e Inducción',
      desc: 'Entrega de EPPs certificados, inducción en seguridad y salud en el trabajo (SST) e incorporación coordinada y presencial al puesto.'
    },
    {
      step: '04',
      icon: Activity,
      title: 'Supervisión Continua & KPI',
      desc: 'Control diario de asistencia, entrega puntual de boletas de pago, seguimiento en terreno y reportes mensuales de productividad.'
    }
  ];

  return (
    <main className="grow font-sans bg-white text-slate-800">
      {/* =========================================================================
          1. HEADER BANNER (AZUL OSCURO)
         ========================================================================= */}
      <section className="bg-[#071321] text-white py-20 lg:py-24 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-10 bg-[#DC2626]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-300">
              Diferenciación & Respaldo
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
            ¿Por qué elegir a <span className="text-[#DC2626]">Aura Corporativa</span> como su socio operativo?
          </h1>
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
            Combinamos solidez jurídica ante Sunafil y Sunat, capacidad de respuesta inmediata y acompañamiento personalizado para blindar su operación en todo el territorio peruano.
          </p>
        </div>
      </section>

      {/* =========================================================================
          2. MÉTRICAS & PILARES DE EFICIENCIA (INTERCALADO: FONDO BLANCO)
         ========================================================================= */}
      <WhyAuraSection showTitle={false} theme="light" />

      {/* =========================================================================
          3. COMPARATIVA VISUAL EXTENDIDA: AURA VS. MODELO TRADICIONAL 
             (INTERCALADO: FONDO AZUL OSCURO, SIN CARDS APRETADAS, ABARCANDO PANTALLA)
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#071321] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 text-left reveal-up">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-300">
                Comparativa de Modelo
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              La Diferencia de Operar con un <span className="text-[#DC2626]">Socio Estratégico</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Compare el impacto de gestionar su personal con métodos tradicionales frente a la tranquilidad de operar con el respaldo de Aura Corporativa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Foto Ilustrativa Grande que Abarca Pantalla */}
            <div className="lg:col-span-5 reveal-up">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/15 group h-80 sm:h-96 lg:h-[500px]">
                <img
                  src={porqueSupervision}
                  alt="Supervisión en terreno Aura Corporativa"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-[#071321]/30 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
                    <span className="text-xs uppercase font-extrabold text-red-400 tracking-wider">
                      Supervisión Presencial en Sede
                    </span>
                  </div>
                  <p className="text-base font-bold text-white leading-snug">
                    Inspecciones laborales y auditoría operativa permanente en cada punto de trabajo.
                  </p>
                </div>
              </div>
            </div>

            {/* Cuadrícula Comparativa Directa y Espaciosa */}
            <div className="lg:col-span-7 space-y-5 reveal-up delay-1">
              {comparisonItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-300 grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  {/* Lado Tradicional */}
                  <div className="flex items-start gap-3.5 border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-5">
                    <XCircle size={22} className="text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Gestión Tradicional
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {item.traditional}
                      </p>
                    </div>
                  </div>

                  {/* Lado Aura */}
                  <div className="flex items-start gap-3.5 sm:pl-3">
                    <CheckCircle2 size={22} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">
                        Con Aura Corporativa
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                        {item.aura}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. METODOLOGÍA EN 4 FASES (INTERCALADO: FONDO BLANCO, ABARCANDO PANTALLA)
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500">
                Metodología Operativa
              </span>
              <span className="h-0.5 w-10 bg-[#DC2626]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              ¿Cómo Blindamos su <span className="text-[#DC2626]">Operación</span>?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
              Un proceso riguroso, formal y transparente diseñado para garantizar continuidad laboral sin contingencias legales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 reveal-stagger">
            {methodologySteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50/80 p-8 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between reveal-up text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-lg bg-red-600/10 text-[#DC2626] flex items-center justify-center font-bold">
                        <StepIcon size={24} />
                      </div>
                      <span className="text-3xl font-black text-slate-300">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CTA FINAL PANORÁMICO (INTERCALADO: FONDO AZUL OSCURO)
         ========================================================================= */}
      <section className="relative text-white py-20 lg:py-24 overflow-hidden bg-[#071321]">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerCorporativo}
            alt="Sedes Aura Corporativa"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071321]/95 via-[#071321]/90 to-[#071321]/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-0.5 w-10 bg-[#DC2626]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-red-400">
              Evaluación Corporativa
            </span>
            <span className="h-0.5 w-10 bg-[#DC2626]" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
            Compruebe la diferencia de operar con respaldo profesional
          </h3>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Solicite una consulta con nuestro equipo directivo y reciba una evaluación preliminar de sus procesos operativos sin compromiso.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-base rounded-md transition-all shadow-lg shadow-red-900/40 cursor-pointer"
            >
              <span>Agendar una Asesoría</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white hover:text-slate-900 text-white font-semibold text-base rounded-md transition-all border-2 border-white/80 cursor-pointer"
            >
              <span>Revisar Servicios</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PorQueAuraPage;
