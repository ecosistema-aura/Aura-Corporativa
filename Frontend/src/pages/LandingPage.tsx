import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { 
  Briefcase, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

interface LandingPageProps {
  onOpenPrivacy?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <main className="grow">
      {/* 1. Hero Principal */}
      <Hero />

      {/* 2. Sección Ejecutiva: Áreas del Ecosistema Aura */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal-up">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#0D1B2A]" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Ecosistema de Soluciones <span className="text-[#DC2626]">Aura Corporativa</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Diseñamos servicios modulares y estratégicos para que su empresa delegue la complejidad operativa y potencie su crecimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Servicios */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group reveal-up">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Servicios de Tercerización
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Externalización de personal operativo, administración de planillas y soporte administrativo integral.
                </p>
              </div>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC2626] hover:text-red-700 transition-colors pt-3 border-t border-slate-100 cursor-pointer"
              >
                <span>Ver Servicios</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 2: ¿Por qué Aura? */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group reveal-up delay-1">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0D1B2A] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  ¿Por qué Elegirnos?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  100% rigor legal ante Sunafil y Sunat, cero contingencias laborales y optimización de costos comprobada.
                </p>
              </div>
              <Link
                to="/por-que-aura"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC2626] hover:text-red-700 transition-colors pt-3 border-t border-slate-100 cursor-pointer"
              >
                <span>Conoce las Ventajas</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 3: Nosotros */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group reveal-up delay-2">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Sobre Nosotros
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Trayectoria, cultura empresarial centrada en el colaborador y respaldo corporativo de primer nivel.
                </p>
              </div>
              <Link
                to="/nosotros"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC2626] hover:text-red-700 transition-colors pt-3 border-t border-slate-100 cursor-pointer"
              >
                <span>Conocer Más</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 4: Blog & Actualidad */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group reveal-up delay-3">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0D1B2A] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Noticias & Blog
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Artículos de actualidad sobre gestión laboral, legislación peruana y tendencias en capital humano.
                </p>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC2626] hover:text-red-700 transition-colors pt-3 border-t border-slate-100 cursor-pointer"
              >
                <span>Ir al Blog</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Casos de Éxito / Testimonios */}
      <TestimonialsSection />

      {/* 4. Banner CTA Final hacia Contacto */}
      <section className="bg-[#0B192C] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-red-400 mb-4 tracking-wider uppercase">
            <CheckCircle2 size={14} />
            <span>Respaldo Garantizado</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Comience a transformar la gestión de su empresa
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Permítanos asesorarlo sin compromiso y descubra cómo optimizar sus procesos laborales con seguridad y eficiencia.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-red-600/30 cursor-pointer"
            >
              <span>Solicitar Asesoría Gratuita</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-base rounded-xl transition-all cursor-pointer"
            >
              <span>Preguntas Frecuentes</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
