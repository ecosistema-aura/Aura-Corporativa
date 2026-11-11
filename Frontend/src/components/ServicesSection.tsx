import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';

import imgTercerizacionOperativa from '../assets/servicio_tercerizacion_operativa.jpg';
import imgPlanillasPayroll from '../assets/servicio_planillas_payroll.jpg';
import imgGestionPersonal from '../assets/servicio_gestion_personal.jpg';
import imgSoporteAdmin from '../assets/servicio_soporte_admin.jpg';

export const ServicesSection: React.FC = () => {
  // Mapeo de fotos 100% EXCLUSIVAS para la sección de servicios (no usadas en inicio)
  const serviceImages: Record<string, string> = {
    'tercerizacion-personal': imgTercerizacionOperativa,
    'administracion-planillas': imgPlanillasPayroll,
    'gestion-integral-personal': imgGestionPersonal,
    'soporte-administrativo': imgSoporteAdmin,
  };

  // Fondos corporativos sobrios para cada bloque (Estilo Grupo Solimano)
  const bgColors: Record<number, string> = {
    0: 'bg-[#071321]', // Deep Navy Solimano
    1: 'bg-[#0B1A2C]', // Slate Blue
    2: 'bg-[#091829]', // Dark Ocean
    3: 'bg-[#071321]', // Deep Navy Solimano
  };

  return (
    <section id="servicios-showcase" className="w-full bg-white">
      {/* Encabezado Institucional Previo */}
      <div className="py-16 sm:py-20 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 reveal-up">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-0.5 w-10 bg-[#DC2626]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500">
            Ecosistema de Soluciones
          </span>
          <span className="h-0.5 w-10 bg-[#DC2626]" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Nuestras Líneas de <span className="text-[#DC2626]">Servicio</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
          Diseñamos servicios modulares y estratégicos en estricto cumplimiento del marco legal vigente, permitiendo a su empresa delegar la complejidad operativa y concentrarse en sus objetivos comerciales.
        </p>
      </div>

      {/* Bloques Edge-to-Edge 50/50 a Pantalla Completa (Inspirado exactamente en Grupo Solimano #Servicios) */}
      <div className="w-full overflow-hidden">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 0;
          const serviceImg = serviceImages[service.id] || imgTercerizacionOperativa;
          const currentBg = bgColors[index] || 'bg-[#071321]';

          return (
            <div
              key={service.id}
              id={service.id}
              className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[540px] lg:min-h-[640px] border-b border-slate-800 last:border-b-0"
            >
              {/* Mitad 1: Fotografía Panorámica Full-Bleed (50% de Pantalla) */}
              <div
                className={`relative w-full h-80 sm:h-96 lg:h-full min-h-[340px] lg:min-h-[640px] overflow-hidden ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <img
                  src={serviceImg}
                  alt={service.title}
                  className="w-full h-full object-cover object-center absolute inset-0"
                  loading="lazy"
                />
                {/* Degradado cinematográfico para integración visual */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#071321]/80 via-transparent to-transparent ${
                    isEven ? 'lg:from-transparent lg:to-[#071321]/70' : 'lg:from-[#071321]/70 lg:to-transparent'
                  }`}
                />

                {/* Sello de Especialidad en la Esquina */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#071321]/85 backdrop-blur-md border border-white/15 text-white text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                    <span>Línea 0{index + 1}</span>
                  </div>
                </div>
              </div>

              {/* Mitad 2: Contenido Corporativo Exhaustivo (50% de Pantalla con amplio padding) */}
              <div
                className={`${currentBg} text-white p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center text-left ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="max-w-xl mx-auto lg:mx-0 w-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-black text-[#DC2626]">
                      0{index + 1}
                    </span>
                    <span className="h-px w-8 bg-white/20" />
                    <span className="text-xs uppercase font-bold tracking-widest text-red-400">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                    {service.title}
                  </h3>

                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-6">
                    {service.description}
                  </p>

                  {/* Alcance del Servicio (Lo que incluye) */}
                  <div className="mb-6 pt-4 border-t border-white/15">
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                      Alcance del Servicio:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.includes.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-[#DC2626] shrink-0" />
                          <span className="text-xs sm:text-sm text-slate-200 font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Beneficio Clave */}
                  {service.keyBenefits && service.keyBenefits.length > 0 && (
                    <div className="p-4 rounded-md bg-white/5 border-l-4 border-l-[#DC2626] mb-8">
                      <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                        Impacto Operativo:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 font-normal">
                        {service.keyBenefits[0]}
                      </p>
                    </div>
                  )}

                  {/* Botón Corporativo de Cotización */}
                  <div>
                    <Link
                      to="/contacto"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-sm sm:text-base rounded-md transition-all shadow-lg shadow-red-900/40 cursor-pointer"
                    >
                      <span>Solicitar Propuesta Comercial</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
