import logoAura from '../assets/logo_aura.jpg';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Share2, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  TrendingUp,
  Volume2,
  VolumeX
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const NosotrosPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isIntersectingRef = useRef(false);
  const isReadyRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [isIntroSettled, setIsIntroSettled] = useState(false);

  const pillarsData = [
    {
      number: '01',
      icon: ShieldCheck,
      title: 'Transparencia & Rigor Legal',
      shortTitle: 'Rigor Legal',
      desc: 'Operamos bajo el marco normativo laboral más estricto de Sunafil y Sunat. Aseguramos total blindaje jurídico, cero contingencias laborales y absoluta tranquilidad para nuestros socios comerciales.',
      badge: '100% Blindaje Legal',
      highlight: 'Cumplimiento Normativo',
    },
    {
      number: '02',
      icon: Users,
      title: 'Enfoque en el Factor Humano',
      shortTitle: 'Factor Humano',
      desc: 'El bienestar del colaborador es el núcleo de nuestro servicio. Diseñamos planes de acompañamiento, motivación e integración continua que maximizan el compromiso y rendimiento en tus operaciones.',
      badge: 'Gestión 360° de Personas',
      highlight: 'Cuidado del Colaborador',
    },
    {
      number: '03',
      icon: TrendingUp,
      title: 'Agilidad & Continuidad Operativa',
      shortTitle: 'Continuidad 24/7',
      desc: 'Reclutamiento acelerado, coberturas inmediatas y ejecutivos de cuenta dedicados para que las actividades críticas de tu empresa sigan funcionando sin interrupciones.',
      badge: 'Respuesta en Tiempo Récord',
      highlight: 'Reemplazos Oportunos',
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Small delay to ensure scroll position has completed resetting to top before activating observer
    const timer = setTimeout(() => {
      isReadyRef.current = true;
    }, 200);

    // Animación de entrada cinemática: El logo aparece en el centro y luego se desplaza a la derecha
    const introTimer = setTimeout(() => {
      setIsIntroSettled(true);
    }, 700);

    return () => {
      clearTimeout(timer);
      clearTimeout(introTimer);
    };
  }, []);

  // Guarantee audio is set and video plays ONLY when scrolled into view
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
        // Only trigger play IF the page is ready and video is currently in the viewport
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
            // Only play if the page transition is complete and the user reached the video
            if (isReadyRef.current) {
              video.volume = 0.3;
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  // If browser strictly blocks unmuted autoplay without prior gesture, start muted
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
      {
        threshold: 0.25,
      }
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

  return (
    <main className="grow bg-[#FAFBFD] font-sans overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* =========================================================================
          1. HERO EN 2 COLUMNAS CON ANIMACIÓN CINEMÁTICA DEL LOGO
         ========================================================================= */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-[#06101D] via-[#0B192C] to-[#1A0910] text-white border-b border-slate-800/80 overflow-hidden flex items-center">
        {/* Halos de luz y gradientes vivos de fondo */}
        <div className="absolute -top-20 left-1/3 w-[600px] h-[350px] bg-red-600/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[300px] bg-blue-600/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-[400px] h-[300px] bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Micro-malla geométrica de profundidad */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Fila Principal en 2 Columnas (Texto + Logo en Paralelo) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 text-center lg:text-left">
            {/* Columna Izquierda: Información Institucional (Entrada Suave) */}
            <div 
              className={`lg:col-span-7 transition-all duration-700 ease-out ${
                isIntroSettled
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 -translate-x-4 sm:-translate-x-8 scale-95 pointer-events-none'
              }`}
            >
              {/* Título de Gran Impacto con Degradado */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Conectamos el talento idóneo con las{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-300">
                  empresas del Perú
                </span>
              </h1>

              {/* Párrafo corporativo */}
              <p className="mt-3.5 sm:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                En <strong className="text-white font-bold">Aura Corporativa</strong> brindamos soluciones integrales de tercerización, gestión humana y administración de planillas con estricto cumplimiento normativo y excelencia operativa continua en todo el territorio nacional.
              </p>
            </div>

            {/* Columna Derecha: Tarjeta de Marca que se traslada del centro a su posición */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end mt-2 sm:mt-0">
              <div 
                className={`relative group w-full max-w-[240px] sm:max-w-xs lg:max-w-sm transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) transform ${
                  isIntroSettled
                    ? 'lg:translate-x-0 scale-100'
                    : 'lg:-translate-x-[calc(70%+1.5rem)] scale-105 sm:scale-115 shadow-[0_0_80px_rgba(220,38,38,0.5)]'
                }`}
              >
                {/* Halo de luz roja interactiva */}
                <div className="absolute -inset-2 sm:-inset-2.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Tarjeta de pedestal blanca para el logo oficial con contraste nítido */}
                <div className="relative overflow-hidden bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-red-500/80 group-hover:border-red-500 transition-colors flex items-center justify-center">
                  <img 
                    src={logoAura} 
                    alt="Aura Corporativa" 
                    className="h-14 sm:h-18 lg:h-22 w-auto object-contain mx-auto select-none drop-shadow-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Strip en Cajas de Alto Contraste con Acento Rojo (Entrada con delay) */}
          <div 
            className={`grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 max-w-6xl mx-auto transition-all duration-700 delay-150 ease-out ${
              isIntroSettled
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <div className="bg-gradient-to-b from-[#0E2238] to-[#081526] p-3.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border-t-2 border-t-[#DC2626] border-x border-b border-slate-800 shadow-lg text-center group hover:border-t-red-400 transition-all">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#DC2626]">100%</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 leading-tight">Cumplimiento Legal</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Sunafil & Sunat</div>
            </div>
            <div className="bg-gradient-to-b from-[#0E2238] to-[#081526] p-3.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border-t-2 border-t-[#DC2626] border-x border-b border-slate-800 shadow-lg text-center group hover:border-t-red-400 transition-all">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-[#DC2626] transition-colors">Nacional</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 leading-tight">Cobertura en Perú</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Costa, Sierra y Selva</div>
            </div>
            <div className="bg-gradient-to-b from-[#0E2238] to-[#081526] p-3.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border-t-2 border-t-[#DC2626] border-x border-b border-slate-800 shadow-lg text-center group hover:border-t-red-400 transition-all">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#DC2626]">24/7</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 leading-tight">Soporte Operativo</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Atención continua</div>
            </div>
            <div className="bg-gradient-to-b from-[#0E2238] to-[#081526] p-5 rounded-xl sm:rounded-2xl border-t-2 border-t-[#DC2626] border-x border-b border-slate-800 shadow-lg text-center group hover:border-t-red-400 transition-all">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-[#DC2626] transition-colors">B2B</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 leading-tight">Soluciones a Medida</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Múltiples sectores</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PILARES & VALORES CORPORATIVOS (ACORDEÓN HORIZONTAL EXPANDIBLE)
         ========================================================================= */}
      <section className="py-14 sm:py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 reveal-up">
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#0D1B2A]" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            Los Pilares que Guían <span className="text-[#DC2626]">Nuestra Labor</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-2 max-w-xl mx-auto">
            Fundamentos éticos y operativos que aseguran relaciones comerciales duraderas y exitosas.
          </p>
        </div>

        {/* Contenedor de Pilares: En móvil tarjetas 100% desplegadas; en desktop acordeón horizontal interactivo */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-5 min-h-0 lg:min-h-[440px] items-stretch reveal-stagger">
          {pillarsData.map((pilar, index) => {
            const Icon = pilar.icon;
            const isActive = activePillar === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setActivePillar(index)}
                onClick={() => setActivePillar(index)}
                className={`reveal-up relative overflow-hidden cursor-default lg:cursor-pointer transition-all duration-500 ease-out border flex flex-col justify-between select-none p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-xs ${
                  isActive
                    ? 'bg-white text-slate-800 border-slate-200/90 lg:flex-[2.6] lg:bg-gradient-to-br lg:from-[#0B192C] lg:via-[#0E2238] lg:to-[#162D45] lg:text-white lg:border-[#DC2626] lg:shadow-xl'
                    : 'bg-white hover:bg-slate-50/80 text-slate-800 border-slate-200/90 lg:flex-1 lg:hover:border-slate-300'
                }`}
              >
                {/* Número Grande en Marca de Agua */}
                <div
                  className={`absolute right-4 -top-2 text-5xl sm:text-6xl lg:text-8xl font-black pointer-events-none transition-opacity duration-500 ${
                    isActive
                      ? 'text-slate-200/70 lg:text-white/5 opacity-70 lg:opacity-100'
                      : 'text-slate-200/70 opacity-70'
                  }`}
                >
                  {pilar.number}
                </div>

                {/* Top Header del Pilar */}
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs ${
                        isActive
                          ? 'bg-red-50 text-[#DC2626] lg:bg-[#DC2626] lg:text-white lg:shadow-red-600/30'
                          : 'bg-red-50 text-[#DC2626]'
                      }`}
                    >
                      <Icon size={22} className="sm:w-6 sm:h-6" />
                    </div>

                    <span
                      className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full transition-colors ${
                        isActive
                          ? 'bg-slate-100 text-slate-600 border border-slate-200/60 lg:bg-white/10 lg:text-slate-300 lg:border-white/10'
                          : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                      }`}
                    >
                      {pilar.highlight}
                    </span>
                  </div>

                  <h3
                    className={`text-lg sm:text-xl lg:text-2xl font-bold tracking-tight mb-2 sm:mb-3 transition-colors ${
                      isActive ? 'text-[#0B192C] lg:text-white' : 'text-[#0B192C]'
                    }`}
                  >
                    {pilar.title}
                  </h3>

                  {/* Descripción: Completamente desplegada en móvil; en desktop acordeón activo/inactivo */}
                  <p
                    className={`text-xs sm:text-sm md:text-base leading-relaxed transition-all duration-300 ${
                      isActive
                        ? 'text-slate-600 lg:text-slate-300 opacity-100 max-h-none lg:max-h-96'
                        : 'text-slate-600 lg:text-slate-500 opacity-100 lg:opacity-80 line-clamp-none lg:line-clamp-3'
                    }`}
                  >
                    {pilar.desc}
                  </p>
                </div>

                {/* Footer Badge de Garantía */}
                <div
                  className={`pt-3.5 sm:pt-4 lg:pt-5 mt-4 sm:mt-5 lg:mt-6 border-t flex items-center gap-2 text-xs font-bold transition-colors ${
                    isActive
                      ? 'border-slate-100 text-slate-700 lg:border-white/15 lg:text-slate-200'
                      : 'border-slate-100 text-slate-700'
                  }`}
                >
                  <CheckCircle2 size={15} className="text-[#DC2626] shrink-0" />
                  <span>{pilar.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. SECCIÓN DE VIDEO CORPORATIVO (AUTO-PLAY ON SCROLL)
         ========================================================================= */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#0B192C] text-white relative overflow-hidden">
        {/* Glow azul marino y acentos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-6 sm:mb-10 reveal-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Aura Corporativa en <span className="text-[#DC2626]">Movimiento</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base mt-2 max-w-xl mx-auto">
              Conoce nuestra cultura, propuesta de valor y metodología de trabajo en terreno.
            </p>
          </div>

          {/* Video Container Frame Responsive with only Volume Control */}
          <div className="max-w-4xl mx-auto w-full flex justify-center reveal-up">
            <div className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-slate-950 border border-slate-700/60 shadow-2xl w-full group">
              <video
                ref={videoRef}
                src="/aura_intro.mp4"
                muted={isMuted}
                playsInline
                loop
                preload="auto"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl sm:rounded-2xl lg:rounded-3xl block"
              >
                <source src="/aura_intro.mp4" type="video/mp4" />
                <source src="/aura%20intro.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video HTML5.
              </video>

              {/* Compact Floating Volume Control that expands on interaction */}
              <div 
                className={`absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 z-20 flex items-center bg-slate-900/85 hover:bg-slate-900/95 backdrop-blur-md rounded-full border border-white/15 shadow-lg text-white transition-all duration-300 ease-out ${
                  isVolumeOpen ? 'w-32 sm:w-40 px-2 sm:px-2.5 py-1 sm:py-1.5 gap-1.5 sm:gap-2' : 'w-7 h-7 sm:w-9 sm:h-9 p-0 justify-center'
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
                  {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>

                {/* Slider shown only when expanded */}
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
          4. HUB DE REDES SOCIALES OFICIALES (HIGH IMPACT)
         ========================================================================= */}
      <section className="py-14 sm:py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="reveal-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
              <Share2 size={14} className="text-[#DC2626]" />
              <span>Comunidad & Canales Oficiales</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B192C] tracking-tight">
              Conéctate con <span className="text-[#DC2626]">Aura Corporativa</span>
            </h2>
            <p className="mt-2.5 sm:mt-3.5 text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Publicamos convocatorias de empleo, guías laborales y contenido sobre gestión empresarial en nuestras redes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 items-stretch reveal-stagger">
            {/* Facebook Card */}
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-up h-full p-5 sm:p-6 lg:p-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs hover:border-[#1877f2] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-center justify-between text-center"
            >
              <div className="flex w-full flex-col items-center text-center">
                <div className="flex h-12 w-12 sm:h-14 sm:h-14 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-[#1877f2] mb-4 sm:mb-5 group-hover:bg-[#1877f2] group-hover:text-white transition-all duration-300 shadow-xs">
                  <svg className="h-6 w-6 sm:h-7 sm:h-7 lg:h-8 lg:w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#1877f2] transition-colors">Facebook</h3>
                <p className="text-xs text-slate-500 mt-1 sm:mt-1.5 leading-relaxed">Convocatorias masivas, eventos y comunidad</p>
              </div>
              <div className="mt-4 sm:mt-6 inline-flex items-center text-xs font-bold text-[#1877f2]">
                <span>Ir a Facebook</span>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-up h-full p-5 sm:p-6 lg:p-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs hover:border-[#e4405f] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-center justify-between text-center"
            >
              <div className="flex w-full flex-col items-center text-center">
                <div className="flex h-12 w-12 sm:h-14 sm:h-14 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-[#e4405f] mb-4 sm:mb-5 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:to-pink-600 group-hover:text-white transition-all duration-300 shadow-xs">
                  <svg className="h-6 w-6 sm:h-7 sm:h-7 lg:h-8 lg:w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#e4405f] transition-colors">Instagram</h3>
                <p className="text-xs text-slate-500 mt-1 sm:mt-1.5 leading-relaxed">Cultura interna, reconocimientos y día a día en Aura</p>
              </div>
              <div className="mt-4 sm:mt-6 inline-flex items-center text-xs font-bold text-[#e4405f]">
                <span>Ver fotos & reels</span>
              </div>
            </a>

            {/* TikTok Card */}
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-up h-full p-5 sm:p-6 lg:p-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs hover:border-black hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-center justify-between text-center"
            >
              <div className="flex w-full flex-col items-center text-center">
                <div className="flex h-12 w-12 sm:h-14 sm:h-14 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 mb-4 sm:mb-5 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-xs">
                  <svg className="h-6 w-6 sm:h-7 sm:h-7 lg:h-8 lg:w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-black transition-colors">TikTok</h3>
                <p className="text-xs text-slate-500 mt-1 sm:mt-1.5 leading-relaxed">Videos cortos, dinámicas de equipo y tips laborales</p>
              </div>
              <div className="mt-4 sm:mt-6 inline-flex items-center text-xs font-bold text-slate-900">
                <span>Ver videos</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. BANNER DE CIERRE CTA
         ========================================================================= */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#0B192C] to-[#142842] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal-up">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-3 sm:mb-4">
            ¿Listo para llevar la gestión de su empresa al siguiente nivel?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-6 sm:mb-8">
            Contáctenos hoy mismo para recibir una asesoría corporativa sin compromiso.
          </p>
          <Link
            to="/contacto"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            <span>Solicitar Cotización Corporativa</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NosotrosPage;
