import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ServicesSection } from '../components/ServicesSection';

export const ServiciosPage: React.FC = () => {
  return (
    <main className="grow">
      {/* Banner de Cabecera Corporativo */}
      <section className="bg-[#0B192C] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Nuestros <span className="text-[#DC2626]">Servicios</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Soluciones integrales de tercerización operativa, administración de nóminas y capital humano diseñadas para maximizar la rentabilidad de su empresa.
          </p>
        </div>
      </section>

      {/* Catálogo Completo de Servicios */}
      <ServicesSection />

      {/* Banner Inferior de Contacto / Cotización */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0B192C] to-[#1E293B] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
                ¿Requiere un servicio a la medida?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Nuestros especialistas evalúan las necesidades específicas de su organización para diseñar un esquema de gestión eficiente y 100% formal.
              </p>
            </div>
            <Link
              to="/contacto"
              className="shrink-0 inline-flex items-center gap-2 px-7 py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-red-600/30 cursor-pointer"
            >
              <span>Solicitar Cotización</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiciosPage;
