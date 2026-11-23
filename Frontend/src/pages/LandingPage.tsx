import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { FaqSection } from '../components/FaqSection';
import { 
  ArrowRight,
  Building2,
  Truck,
  ShoppingBag,
  Sparkles,
  Phone
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

import cardTercerizacion from '../assets/card_tercerizacion.jpg';
import intermediacionFormal from '../assets/intermediacion_formal.jpg';
import cardBlogNoticias from '../assets/card_blog_noticias.jpg';
import cardEquipoNosotros from '../assets/card_equipo_nosotros.jpg';
import bannerCorporativo from '../assets/banner_corporativo.jpg';

interface LandingPageProps {
  onOpenPrivacy?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  // 1. Servicios Principales en Formato Resumido y Esencial (Preservando Imágenes con Enlace Directo a Servicios)
  const coreServices = [
    {
      id: 'tercerizacion-personal',
      number: '01',
      category: 'Outsourcing Operativo',
      title: 'Tercerización de Personal',
      desc: 'Externalización estratégica y supervisión en sede de personal calificado para almacenes, logística y plantas industriales.',
      image: cardTercerizacion,
      link: '/servicios#tercerizacion-personal'
    },
    {
      id: 'administracion-planillas',
      number: '02',
      category: 'Payroll & Nóminas',
      title: 'Administración de Planillas',
      desc: 'Cálculo confidencial de haberes, beneficios de ley y declaraciones ante Sunat y AFPnet con cero contingencias laborales.',
      image: cardBlogNoticias,
      link: '/servicios#administracion-planillas'
    },
    {
      id: 'gestion-integral-personal',
      number: '03',
      category: 'Capital Humano & Selección',
      title: 'Gestión Integral del Personal',
      desc: 'Atracción ágil de talento calificado, gestión de legajos y acompañamiento continuo en todo el ciclo laboral del colaborador.',
      image: cardEquipoNosotros,
      link: '/servicios#gestion-integral-personal'
    },
    {
      id: 'soporte-administrativo',
      number: '04',
      category: 'Eficiencia Operativa',
      title: 'Soporte Administrativo',
      desc: 'Gestión documentaria rigurosa, archivo de contratos y control de procesos para optimizar los tiempos de su empresa.',
      image: intermediacionFormal,
      link: '/servicios#soporte-administrativo'
    }
  ];

  // 2. Sectores Atendidos
  const sectors = [
    {
      icon: Truck,
      title: 'Logística & Distribución',
      desc: 'Cuadrillas especializadas para centros de distribución, cross-docking y almacenes con control continuo de turnos.',
      roles: ['Estibadores y Picking', 'Montacarguistas', 'Inventariadores', 'Auxiliares de Despacho']
    },
    {
      icon: ShoppingBag,
      title: 'Retail & Comercio',
      desc: 'Personal ágil para piso de venta, reposición acelerada y atención directa durante campañas y picos de demanda.',
      roles: ['Cajeros y Facturación', 'Reponedores en Sala', 'Mercaderistas', 'Prevención de Pérdidas']
    },
    {
      icon: Building2,
      title: 'Soporte Corporativo',
      desc: 'Talento administrativo para recepción, digitación, archivo y soporte en sedes corporativas con filtros rigurosos.',
      roles: ['Recepcionistas', 'Digitadores Masivos', 'Asistentes de Oficina', 'Gestores de Archivo']
    },
    {
      icon: Sparkles,
      title: 'Servicios Generales',
      desc: 'Cuadrillas para limpieza industrial de sedes, mantenimiento locativo y soporte auxiliar operativo continuo.',
      roles: ['Operarios de Limpieza', 'Mantenimiento Básico', 'Auxiliares de Planta', 'Conserjería']
    }
  ];

  return (
    <main className="grow font-sans bg-white text-slate-800">
      {/* =========================================================================
          1. HERO PRINCIPAL CINEMATOGRÁFICO (AZUL OSCURO - INTACTO)
         ========================================================================= */}
      <Hero />

      {/* =========================================================================
          2. SOLIDEZ EMPRESARIAL & CIFRAS (INTERCALADO: FONDO BLANCO)
         ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 text-left reveal-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500">
                Solidez Empresarial
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Soluciones integrales en Gestión Humana, Tercerización y Planillas en el Perú
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Somos un aliado estratégico que absorbe la complejidad operativa y laboral de su empresa. Diseñamos modelos a la medida para garantizar máxima productividad, continuidad en terreno y estricto cumplimiento del marco legal ante Sunafil y Sunat.
            </p>
          </div>

          {/* Cifras de Respaldo en Cajas Claras y Sobrias */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal-stagger">
            <div className="p-6 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left reveal-up">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#DC2626] tracking-tight">
                100%
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-2">
                Cumplimiento Legal
              </div>
              <div className="text-xs text-slate-500 mt-1 font-normal">
                Sunafil & Sunat al día
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left reveal-up">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#DC2626] tracking-tight">
                24-48h
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-2">
                Tiempo de Respuesta
              </div>
              <div className="text-xs text-slate-500 mt-1 font-normal">
                Cobertura y reemplazos ágiles
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left reveal-up">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Nacional
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-2">
                Cobertura Operativa
              </div>
              <div className="text-xs text-slate-500 mt-1 font-normal">
                Costa, Sierra y Selva
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left reveal-up">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#DC2626] tracking-tight">
                0%
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-2">
                Contingencias
              </div>
              <div className="text-xs text-slate-500 mt-1 font-normal">
                Blindaje normativo total
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. LÍNEAS DE ESPECIALIDAD (REDISEÑO CONCISO: IMÁGENES PRESERVADAS, 
             CONTENIDO ESENCIAL RESUMIDO Y BOTONES DIRECTOS HACIA SERVICIOS)
         ========================================================================= */}
      <section id="lineas-especialidad" className="py-20 lg:py-24 bg-[#071321] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado Principal */}
          <div className="max-w-3xl mb-12 sm:mb-16 text-left reveal-up">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-300">
                Líneas de Especialidad
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Servicios Diseñados para Impulsar su <span className="text-[#DC2626]">Rentabilidad</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Modelos operativos ágiles y flexibles para delegar personal y nóminas con absoluta seguridad jurídica.
            </p>
          </div>

          {/* Grid Ejecutivo 2x2: Imágenes preservadas, contenido esencial resumido y botones directos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {coreServices.map((service) => {
              return (
                <div
                  key={service.id}
                  className="bg-slate-900/60 border border-white/10 flex flex-col reveal-up"
                >
                  {/* Contenedor de Imagen con Overlay y Badges */}
                  <div className="relative h-60 sm:h-72 overflow-hidden bg-slate-950">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-transparent to-transparent opacity-90" />

                    {/* Badges superiores: Número y Categoría (bordes rectos) */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 bg-[#071321]/80 backdrop-blur-md border border-white/15 text-xs font-bold text-white tracking-widest">
                        {service.number}
                      </span>
                      <span className="px-3 py-1 bg-[#DC2626] text-white text-[11px] font-bold tracking-wider uppercase shadow-sm">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Contenido Esencial Resumido */}
                  <div className="p-6 sm:p-8 flex flex-col grow justify-between bg-[#071321]">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-2.5">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-6">
                        {service.desc}
                      </p>
                    </div>

                    {/* Botón directo a la sección respectiva en Servicios (bordes rectos) */}
                    <div className="pt-4 border-t border-white/10">
                      <Link
                        to={service.link}
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
                      >
                        <span>Ver en Servicios</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. SECTORES PRODUCTIVOS ATENDIDOS (EXPERIENCIA SECTORIAL CON BORDES RECTOS)
         ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500">
                Experiencia Sectorial
              </span>
              <span className="h-0.5 w-10 bg-[#DC2626]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sectores que Confían en Nuestro <span className="text-[#DC2626]">Respaldo</span>
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto font-normal">
              Adaptamos los perfiles de puesto, protocolos y supervisión a los requerimientos específicos de cada actividad económica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sec, i) => {
              const SecIcon = sec.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-white border border-slate-200 text-[#071321] flex items-center justify-center mb-4 shadow-xs">
                      <SecIcon size={22} className="text-[#DC2626]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {sec.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                      {sec.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/80">
                      {sec.roles.map((role, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-2 py-0.5 text-[11px] font-medium bg-slate-200/70 text-slate-700 border border-slate-300/60"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PREGUNTAS FRECUENTES (FAQ DIRECTO EN INICIO)
         ========================================================================= */}
      <FaqSection />

      {/* =========================================================================
          7. BANNER PANORÁMICO FINAL DE CONTACTO (INTERCALADO: FONDO AZUL OSCURO)
         ========================================================================= */}
      <section className="relative text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerCorporativo}
            alt="Aura Corporativa Sedes"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071321]/95 via-[#071321]/90 to-[#071321]/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-0.5 w-10 bg-[#DC2626]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-red-400">
              Atención Inmediata a Empresas
            </span>
            <span className="h-0.5 w-10 bg-[#DC2626]" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
            ¿Listo para optimizar la gestión de personal en su organización?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Contáctenos hoy mismo para recibir una evaluación preliminar de sus requerimientos de personal y nóminas sin compromiso.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-base rounded-md transition-all shadow-lg shadow-red-900/40 cursor-pointer"
            >
              <span>Solicitar Asesoría</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href={'tel:' + siteConfig.contact.phone.value}
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white hover:text-slate-900 text-white font-semibold text-base rounded-md transition-all border-2 border-white/80 cursor-pointer"
            >
              <Phone size={18} />
              <span>{siteConfig.contact.phone.display}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
