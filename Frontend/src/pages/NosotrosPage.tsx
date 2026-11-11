import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ShieldCheck,
  TrendingUp,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  Search,
  FileCheck,
  UserCheck,
  Activity
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

import logoAura from '../assets/logo_aura.jpg';
import porqueSupervision from '../assets/porque_supervision.jpg';

export const NosotrosPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isIntersectingRef = useRef(false);
  const isReadyRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [isIntroSettled, setIsIntroSettled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const timer = setTimeout(() => {
      isReadyRef.current = true;
    }, 200);

    // Animación de entrada cinemática del logo
    const introTimer = setTimeout(() => {
      setIsIntroSettled(true);
    }, 700);

    return () => {
      clearTimeout(timer);
      clearTimeout(introTimer);
    };
  }, []);

  // Video Autoplay controlado al hacer scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0.3;
    video.muted = false;
    video.pause();

    const unlockAudio = () => {
      if (video) {
        video.muted = false;
        video.volume = 0.3;
        setIsMuted(false);
        if (isReadyRef.current && isIntersectingRef.current && video.paused && !video.ended) {
          video.play().catch(() => {});
        }
      }
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersectingRef.current = true;
            if (isReadyRef.current) {
              video.volume = 0.3;
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  video.muted = true;
                  setIsMuted(true);
                  video.play().catch(() => {});
                });
              }
            }
          } else {
            isIntersectingRef.current = false;
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && (videoRef.current.volume === 0 || volume === 0)) {
      videoRef.current.volume = 0.3;
      setVolume(0.3);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVol = parseFloat(e.target.value);
    videoRef.current.volume = newVol;
    setVolume(newVol);
    if (newVol === 0) {
      videoRef.current.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  // Pilares estratégicos de valor
  const pillarsData = [
    {
      number: '01',
      icon: ShieldCheck,
      title: 'Transparencia & Rigor Legal',
      desc: 'Operamos bajo el marco normativo laboral más estricto de Sunafil y Sunat. Aseguramos total blindaje jurídico, cumplimiento de leyes N° 27626 y N° 29245, cero contingencias y absoluta tranquilidad para nuestros clientes.',
      badge: '100% Blindaje Legal',
      highlight: 'Cumplimiento Normativo',
    },
    {
      number: '02',
      icon: Users,
      title: 'Enfoque en el Factor Humano',
      desc: 'El bienestar del colaborador es el núcleo de nuestro servicio. Diseñamos planes de acompañamiento, motivación, seguridad laboral (Ley N° 29783) e integración que maximizan el compromiso y rendimiento en sus operaciones.',
      badge: 'Gestión 360° de Personas',
      highlight: 'Cuidado del Colaborador',
    },
    {
      number: '03',
      icon: TrendingUp,
      title: 'Agilidad & Continuidad Operativa',
      desc: 'Reclutamiento acelerado, coberturas inmediatas y supervisión de cuenta dedicada para que las actividades críticas de su empresa sigan funcionando sin interrupciones ni tiempos muertos.',
      badge: 'Respuesta en Tiempo Récord',
      highlight: 'Continuidad 24/7',
    },
    {
      number: '04',
      icon: HeartHandshake,
      title: 'Cercanía & Soluciones Ad-hoc',
      desc: 'Dedicamos el tiempo necesario para comprender la dinámica particular de su industria, diseñando esquemas operativos, de nómina y dotación de personal hechos con total adaptabilidad y rigor.',
      badge: 'Soluciones a Medida',
      highlight: 'Vocación de Servicio',
    },
  ];

  // Comparativa Aura vs Modelo Tradicional (de ¿Por qué Aura?)
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

  // Metodología Operativa en 4 Fases (de ¿Por qué Aura?)
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

  // Nuestros Valores Corporativos
  const tawaValues = [
    {
      number: '01',
      title: 'Pasión por la Excelencia',
      desc: 'Sentimos entusiasmo por lo que logramos y ayudamos a lograr a nuestros clientes. Aprendemos y mejoramos continuamente con la meta de liderar cada servicio que brindamos.'
    },
    {
      number: '02',
      title: 'Rigurosidad y Detalle',
      desc: 'Prestamos completa atención a las particularidades de cada contrato, planilla y operación. Somos responsables con cada detalle buscando eficiencia y calidad en los resultados.'
    },
    {
      number: '03',
      title: 'Integridad y Transparencia',
      desc: 'Asumimos completamente nuestras responsabilidades y nos hacemos cargo de las consecuencias de nuestras acciones con honestidad y ética absoluta ante nuestros socios.'
    },
    {
      number: '04',
      title: 'Flexibilidad e Innovación',
      desc: 'Somos receptivos a nuevos retos y nos adaptamos ágilmente a los cambios de mercado, circunstancias imprevistas y necesidades específicas de cada operación en terreno.'
    }
  ];

  return (
    <main className="grow font-sans bg-white text-slate-800 selection:bg-red-500 selection:text-white">
      {/* =========================================================================
          1. HERO INSTITUCIONAL (ANIMACIÓN CINEMÁTICA CON EL LOGO COMO FOCUS PURO)
         ========================================================================= */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-gradient-to-br from-[#06101D] via-[#0B192C] to-[#1A0910] text-white border-b border-slate-800/80 overflow-hidden flex items-center">
        {/* Halos de luz y gradientes vivos de fondo */}
        <div className="absolute -top-20 left-1/3 w-[600px] h-[350px] bg-red-600/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[300px] bg-blue-600/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-[400px] h-[300px] bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Micro-malla geométrica de profundidad */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Fila Principal en 2 Columnas (Texto + Logo en Paralelo) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-14 text-center lg:text-left">
            
            {/* Columna Izquierda: Información Institucional (Entrada Suave) */}
            <div 
              className={`lg:col-span-7 transition-all duration-700 ease-out ${
                isIntroSettled
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 -translate-x-4 sm:-translate-x-8 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <span className="h-0.5 w-10 bg-[#DC2626]" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-400">
                  Nosotros • Grupo Aura
                </span>
              </div>

              {/* Título de Gran Impacto con Degradado */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.12]">
                Conectamos el talento idóneo con las{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-300">
                  empresas del Perú
                </span>
              </h1>

              {/* Párrafo corporativo formal */}
              <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                En <strong className="text-white font-bold">Aura Corporativa</strong> brindamos soluciones integrales de tercerización operativa, intermediación laboral y administración de planillas con estricto blindaje legal y excelencia continua en todo el territorio nacional.
              </p>

              {/* Acciones principales */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-base rounded-md transition-all shadow-lg shadow-red-900/40 cursor-pointer"
                >
                  <span>Conoce Nuestras Soluciones</span>
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white hover:text-slate-900 text-white font-semibold text-base rounded-md transition-all border border-slate-600 cursor-pointer"
                >
                  <span>Contáctanos</span>
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta de Pedestal donde el LOGO es el FOCUS PURO (sin texto abajo) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 sm:mt-0">
              <div 
                className={`relative group w-full max-w-[280px] sm:max-w-sm lg:max-w-md transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) transform ${
                  isIntroSettled
                    ? 'lg:translate-x-0 scale-100'
                    : 'lg:-translate-x-[calc(65%+1.5rem)] scale-110 sm:scale-120 shadow-[0_0_90px_rgba(220,38,38,0.6)]'
                }`}
              >
                {/* Halo de luz roja interactiva con brillo vibrante */}
                <div className="absolute -inset-2.5 sm:-inset-3 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-3xl blur-md opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Tarjeta de pedestal blanca limpia para el logo oficial con contraste nítido y protagonismo total */}
                <div className="relative overflow-hidden bg-white p-8 sm:p-12 lg:p-14 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-2 border-red-500/80 group-hover:border-red-500 transition-colors flex items-center justify-center">
                  <img 
                    src={logoAura} 
                    alt="Aura Corporativa" 
                    className="h-16 sm:h-22 lg:h-28 w-auto object-contain mx-auto select-none drop-shadow-md"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Metrics Strip en Cajas de Alto Contraste con Acento Rojo (Entrada con delay) */}
          <div 
            className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 max-w-7xl mx-auto transition-all duration-700 delay-150 ease-out ${
              isIntroSettled
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <div className="bg-gradient-to-b from-[#0E2238] to-[#081526] p-4 sm:p-5 rounded-xl sm:rounded-2xl border-t-2 border-t-[#DC2626] border-x border-b border-slate-800 shadow-lg text-center group hover:border-t-red-400 transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#DC2626]">100%</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 leading-tight">Cumplimiento Legal</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Sunafil & Sunat</div>
            </div>

            <div className="bg-gradient-to-b from-[#0E2238] to-[#081526] p-4 sm:p-5 rounded-xl sm:rounded-2xl border-t-2 border-t-[#DC2626] border-x border-b border-slate-800 shadow-lg text-center group hover:border-t-red-400 transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-[#DC2626] transition-colors">Nacional</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 leading-tight">Cobertura en Perú</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Costa, Sierra y Selva</div>
            </div>

            <div className="bg-gradient-to-b from-[#0E2238] to-[#081526] p-4 sm:p-5 rounded-xl sm:rounded-2xl border-t-2 border-t-[#DC2626] border-x border-b border-slate-800 shadow-lg text-center group hover:border-t-red-400 transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#DC2626]">24/7</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 leading-tight">Soporte Operativo</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Atención continua</div>
            </div>

            <div className="bg-gradient-to-b from-[#0E2238] to-[#081526] p-4 sm:p-5 rounded-xl sm:rounded-2xl border-t-2 border-t-[#DC2626] border-x border-b border-slate-800 shadow-lg text-center group hover:border-t-red-400 transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-[#DC2626] transition-colors">100%</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 leading-tight">Cero Contingencias</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Tranquilidad B2B</div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. PILARES ESTRATÉGICOS DE VALOR (INTERCALADO: FONDO BLANCO)
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 reveal-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500">
                Fundamentos Operativos
              </span>
              <span className="h-0.5 w-10 bg-[#DC2626]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Los Pilares que Guían <span className="text-[#DC2626]">Nuestra Labor</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
              Fundamentos éticos, jurídicos y operativos que aseguran relaciones comerciales transparentes y de alto rendimiento.
            </p>
          </div>

          {/* Acordeón Horizontal Dinámico / Tarjetas Interactivas de Gran Cobertura */}
          <div className="flex flex-col lg:flex-row gap-5 min-h-0 lg:min-h-[440px] items-stretch reveal-stagger">
            {pillarsData.map((pilar, index) => {
              const Icon = pilar.icon;
              const isActive = activePillar === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActivePillar(index)}
                  onClick={() => setActivePillar(index)}
                  className={`reveal-up relative overflow-hidden cursor-default lg:cursor-pointer transition-all duration-500 ease-out border flex flex-col justify-between select-none p-6 sm:p-8 rounded-2xl shadow-xs ${
                    isActive
                      ? 'bg-gradient-to-br from-[#0B192C] via-[#0E2238] to-[#162D45] text-white border-[#DC2626] shadow-2xl lg:flex-[2.5]'
                      : 'bg-slate-50/80 hover:bg-slate-100 text-slate-800 border-slate-200 lg:flex-1'
                  }`}
                >
                  {/* Número de fondo en marca de agua */}
                  <div
                    className={`absolute right-4 -top-2 text-6xl lg:text-8xl font-black pointer-events-none transition-opacity duration-500 ${
                      isActive ? 'text-white/5 opacity-100' : 'text-slate-200/80 opacity-70'
                    }`}
                  >
                    {pilar.number}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-xs ${
                          isActive
                            ? 'bg-[#DC2626] text-white shadow-lg shadow-red-900/40'
                            : 'bg-red-50 text-[#DC2626] border border-red-100'
                        }`}
                      >
                        <Icon size={24} />
                      </div>

                      <span
                        className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-md transition-colors ${
                          isActive
                            ? 'bg-white/10 text-slate-300 border border-white/15'
                            : 'bg-white text-slate-600 border border-slate-200 shadow-2xs'
                        }`}
                      >
                        {pilar.highlight}
                      </span>
                    </div>

                    <h3
                      className={`text-xl lg:text-2xl font-bold tracking-tight mb-3 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {pilar.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base leading-relaxed transition-all duration-300 ${
                        isActive
                          ? 'text-slate-300 opacity-100 max-h-none'
                          : 'text-slate-600 opacity-90 line-clamp-3 lg:line-clamp-4'
                      }`}
                    >
                      {pilar.desc}
                    </p>
                  </div>

                  <div
                    className={`pt-5 mt-6 border-t flex items-center gap-2 text-xs sm:text-sm font-bold transition-colors ${
                      isActive ? 'border-white/15 text-slate-200' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 size={16} className="text-[#DC2626] shrink-0" />
                    <span>{pilar.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. COMPARATIVA VISUAL: AURA VS. MODELO TRADICIONAL (INTERCALADO: FONDO AZUL OSCURO #071321)
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
          4. METODOLOGÍA EN 4 FASES (INTERCALADO: FONDO BLANCO)
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
          5. NUESTROS VALORES (INTERCALADO: FONDO AZUL OSCURO #071321)
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#071321] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 reveal-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-300">
                Cultura & Principios
              </span>
              <span className="h-0.5 w-10 bg-[#DC2626]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Nuestros <span className="text-[#DC2626]">Valores</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
              Principios que guían nuestra conducta diaria, nuestro compromiso con el colaborador y nuestras relaciones con cada cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 reveal-stagger">
            {tawaValues.map((val, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-[#DC2626] mb-4">
                    {val.number}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. VIDEO INSTITUCIONAL AURA EN MOVIMIENTO (INTERCALADO: FONDO SLATE-50)
         ========================================================================= */}
      <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14 reveal-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500">
                Cultura en Terreno
              </span>
              <span className="h-0.5 w-10 bg-[#DC2626]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Aura Corporativa en <span className="text-[#DC2626]">Movimiento</span>
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto font-normal">
              Conozca nuestra propuesta de valor, estándares de operación y metodología de trabajo en terreno.
            </p>
          </div>

          <div className="max-w-4xl mx-auto w-full flex justify-center reveal-up">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-300 shadow-2xl w-full group">
              <video
                ref={videoRef}
                src="/aura_intro.mp4"
                muted={isMuted}
                playsInline
                loop
                preload="auto"
                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl block"
              >
                <source src="/aura_intro.mp4" type="video/mp4" />
                <source src="/aura%20intro.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video HTML5.
              </video>

              <div 
                className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center bg-slate-900/85 hover:bg-slate-900/95 backdrop-blur-md rounded-full border border-white/15 shadow-lg text-white transition-all duration-300 ease-out ${
                  isVolumeOpen ? 'w-32 sm:w-40 px-2 sm:px-2.5 py-1 sm:py-1.5 gap-1.5 sm:gap-2' : 'w-8 h-8 sm:w-9 sm:h-9 p-0 justify-center'
                }`}
                onMouseEnter={() => setIsVolumeOpen(true)}
                onMouseLeave={() => setIsVolumeOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!isVolumeOpen) {
                      setIsVolumeOpen(true);
                    } else {
                      toggleMute();
                    }
                  }}
                  className="text-white hover:text-[#DC2626] transition-colors shrink-0 p-1 cursor-pointer flex items-center justify-center focus:outline-hidden"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  title={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <div className={`overflow-hidden transition-all duration-300 flex items-center ${isVolumeOpen ? 'w-full opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#DC2626]"
                    aria-label="Control de volumen"
                    title={`Volumen: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CANALES OFICIALES & COMUNIDAD (INTERCALADO: FONDO AZUL OSCURO #071321)
         ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#071321] text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-300">
                Canales Corporativos
              </span>
              <span className="h-0.5 w-10 bg-[#DC2626]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Conéctese con <span className="text-[#DC2626]">Aura Corporativa</span>
            </h2>
            <p className="mt-3 text-base text-slate-300 max-w-xl mx-auto font-normal">
              Publicamos convocatorias laborales masivas, actualizaciones de ley y contenido sobre gestión empresarial en nuestras plataformas oficiales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 items-stretch reveal-stagger">
            {/* Facebook Card */}
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-white/5 rounded-xl border border-white/10 hover:border-[#1877f2] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center justify-between text-center"
            >
              <div className="flex w-full flex-col items-center text-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-[#1877f2] mb-5 group-hover:bg-[#1877f2] group-hover:text-white transition-all duration-300 shadow-xs">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-white text-lg group-hover:text-[#1877f2] transition-colors">Facebook</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">Convocatorias masivas, eventos corporativos y comunidad</p>
              </div>
              <div className="mt-6 inline-flex items-center text-xs font-bold text-[#1877f2]">
                <span>Ir a Facebook</span>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-white/5 rounded-xl border border-white/10 hover:border-[#e4405f] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center justify-between text-center"
            >
              <div className="flex w-full flex-col items-center text-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-pink-500/20 text-[#e4405f] mb-5 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:to-pink-600 group-hover:text-white transition-all duration-300 shadow-xs">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-white text-lg group-hover:text-[#e4405f] transition-colors">Instagram</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">Cultura interna, reconocimientos y día a día en Aura</p>
              </div>
              <div className="mt-6 inline-flex items-center text-xs font-bold text-[#e4405f]">
                <span>Ver fotos & reels</span>
              </div>
            </a>

            {/* TikTok Card */}
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-white/5 rounded-xl border border-white/10 hover:border-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center justify-between text-center"
            >
              <div className="flex w-full flex-col items-center text-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white mb-5 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-xs">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-white text-lg group-hover:text-white transition-colors">TikTok</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">Videos cortos, dinámicas de equipo y tips laborales</p>
              </div>
              <div className="mt-6 inline-flex items-center text-xs font-bold text-white">
                <span>Ver videos</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. BANNER DE CIERRE CORPORATIVO (INTERCALADO: FONDO AZUL OSCURO #071321)
         ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#071321] text-white border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal-up">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-0.5 w-10 bg-[#DC2626]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-400">
              Iniciemos una conversación
            </span>
            <span className="h-0.5 w-10 bg-[#DC2626]" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            ¿Listo para llevar la gestión de su empresa al <span className="text-[#DC2626]">siguiente nivel</span>?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Contáctenos hoy mismo para coordinar una reunión ejecutiva y evaluar sus requerimientos con nuestro equipo directivo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-base rounded-md transition-all shadow-lg shadow-red-900/40 cursor-pointer"
            >
              <span>Solicitar Asesoría Directiva</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white hover:text-slate-900 text-white font-semibold text-base rounded-md transition-all border border-slate-600 cursor-pointer"
            >
              <span>Nuestros Servicios</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NosotrosPage;
