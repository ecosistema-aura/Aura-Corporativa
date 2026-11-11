import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, UserCheck, FileCheck, Phone } from 'lucide-react';
import { ServicesSection } from '../components/ServicesSection';
import { siteConfig } from '../config/siteConfig';
import bannerCorporativo from '../assets/banner_corporativo.jpg';

export const ServiciosPage: React.FC = () => {
  const serviceGuarantees = [
    {
      icon: ShieldCheck,
      title: 'Blindaje Jurídico Total',
      desc: 'Supervisión rigurosa de cada contrato laboral, registro formal ante el MTPE y gestión estricta de aportes para asegurar cero contingencias ante Sunafil y Sunat.'
    },
    {
      icon: Clock,
      title: 'Respuesta Operativa en 24-48h',
      desc: 'Banco de talento calificado y capacidad de despliegue acelerado para suplir ausencias imprevistas, licencias o picos repentinos de producción.'
    },
    {
      icon: UserCheck,
      title: 'Ejecutivo de Cuenta Dedicado',
      desc: 'Un profesional directivo asignado a su organización para coordinar incidencias, control de asistencia diario y supervisión activa en cada sede.'
    },
    {
      icon: FileCheck,
      title: 'Transparencia & Auditoría Abierta',
      desc: 'Liquidaciones de beneficios sociales al día, reportes mensuales por centro de costo y acceso permanente a toda la documentación de su personal.'
    }
  ];

  return (
    <main className="grow font-sans bg-white text-slate-800">
      {/* =========================================================================
          1. HEADER BANNER CORPORATIVO (AZUL OSCURO)
         ========================================================================= */}
      <section className="bg-[#071321] text-white py-20 lg:py-24 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-10 bg-[#DC2626]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-300">
              Soluciones Especializadas
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
            Líneas de Servicio en <span className="text-[#DC2626]">Tercerización</span> y Gestión Humana
          </h1>
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
            Externalización operativa, intermediación laboral y administración de nóminas diseñadas para maximizar la productividad y blindar jurídicamente a su empresa en todo el Perú.
          </p>
        </div>
      </section>

      {/* =========================================================================
          2. SHOWCASE COMPLETO DE SERVICIOS (ESTILO GRUPO SOLIMANO #SERVICIOS:
             EDGE-TO-EDGE 50/50 A PANTALLA COMPLETA, CON FOTOS EXCLUSIVAS)
         ========================================================================= */}
      <ServicesSection />

      {/* =========================================================================
          3. GARANTÍAS OPERATIVAS & SLA (INTERCALADO: FONDO BLANCO, ABARCANDO PANTALLA)
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-0.5 w-10 bg-[#DC2626]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500">
                Compromiso de Calidad
              </span>
              <span className="h-0.5 w-10 bg-[#DC2626]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Garantías de Nuestro <span className="text-[#DC2626]">Modelo Operativo</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
              Estándares formales que aseguran continuidad operativa, predictibilidad financiera y total tranquilidad jurídica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 reveal-stagger">
            {serviceGuarantees.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-red-600/10 border border-red-500/20 text-[#DC2626] flex items-center justify-center mb-6">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BANNER PANORÁMICO FINAL DE COTIZACIÓN (AZUL OSCURO CON FOTO)
         ========================================================================= */}
      <section className="relative text-white py-20 lg:py-24 overflow-hidden bg-[#071321]">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerCorporativo}
            alt="Sede Central Aura Corporativa"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071321]/95 via-[#071321]/90 to-[#071321]/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-0.5 w-10 bg-[#DC2626]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-red-400">
              Propuesta Personalizada
            </span>
            <span className="h-0.5 w-10 bg-[#DC2626]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
            ¿Requiere un esquema operativo diseñado a la medida de su empresa?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Nuestros especialistas evalúan las necesidades específicas de su sector para estructurar un presupuesto formal, transparente y 100% formal.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-base rounded-md transition-all shadow-lg shadow-red-900/40 cursor-pointer"
            >
              <span>Solicitar Cotización</span>
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

export default ServiciosPage;
