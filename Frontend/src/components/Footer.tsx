import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import logoAuraMini from '../assets/logo_aura_mini.jpg';

interface FooterProps {
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms, onOpenPrivacy }) => {
  return (
    <footer className="relative bg-[#071321] text-slate-400 font-sans border-t border-slate-800/80 pt-16 pb-8 overflow-hidden">
      {/* Halftone dot matrix decorativo superior sutil (estilo ZWE Corporativa) */}
      <div
        className="absolute inset-x-0 top-0 h-44 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Principal de 4 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.1fr_1.2fr] gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Columna 1: Brand, Tagline y Redes Sociales */}
          <div className="flex flex-col">
            <Link to="/" className="inline-block mb-3.5 w-fit" aria-label="Aura Corporativa Inicio">
              <div className="flex items-center gap-2.5">
                <img
                  src={logoAuraMini}
                  alt="Aura Corporativa"
                  className="w-9 h-9 rounded-md object-cover drop-shadow-xs"
                />
                <div className="text-base font-black tracking-wider text-white select-none">
                  AURA <span className="text-[#DC2626]">CORPORATIVA</span>
                </div>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-sm">
              Soluciones integrales de tercerización de personal, planillas y soporte administrativo en Lima, Perú. Respaldando la productividad y el cumplimiento de su empresa.
            </p>

            {/* Redes Sociales con estilo de botones de ZWE */}
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook oficial de Aura Corporativa"
                className="w-[34px] h-[34px] rounded-lg border border-slate-700/80 bg-white/[0.04] text-white hover:bg-[#DC2626] hover:border-[#DC2626] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram oficial de Aura Corporativa"
                className="w-[34px] h-[34px] rounded-lg border border-slate-700/80 bg-white/[0.04] text-white hover:bg-[#DC2626] hover:border-[#DC2626] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok oficial de Aura Corporativa"
                className="w-[34px] h-[34px] rounded-lg border border-slate-700/80 bg-white/[0.04] text-white hover:bg-[#DC2626] hover:border-[#DC2626] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="flex flex-col">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Navegación
            </span>
            <nav className="flex flex-col gap-2.5 text-sm" aria-label="Enlaces del pie de página">
              <Link to="/" className="text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                Inicio
              </Link>
              <Link to="/nosotros" className="text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                Nosotros
              </Link>
              <Link to="/servicios" className="text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                Servicios
              </Link>
              <Link to="/blog" className="text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                Blog Noticiero
              </Link>
              <Link to="/contacto" className="text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Columna 3: Especialidades */}
          <div className="flex flex-col">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Especialidades
            </span>
            <nav className="flex flex-col gap-2.5 text-sm" aria-label="Servicios principales">
              <Link to="/servicios#tercerizacion-personal" className="text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                Tercerización de Personal
              </Link>
              <Link to="/servicios#administracion-planillas" className="text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                Administración de Planillas
              </Link>
              <Link to="/servicios#gestion-integral-personal" className="text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                Gestión Integral del Personal
              </Link>
              <Link to="/servicios#soporte-administrativo" className="text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                Soporte Administrativo
              </Link>
              <Link to="/servicios#tercerizacion-personal" className="text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                Intermediación Laboral
              </Link>
            </nav>
          </div>

          {/* Columna 4: Oficina & Contacto */}
          <div className="flex flex-col">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Oficina &amp; Contacto
            </span>
            <ul className="flex flex-col gap-3 text-sm" role="list">
              <li className="flex items-start gap-2.5 text-slate-400 leading-snug">
                <MapPin size={16} className="text-[#DC2626] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{siteConfig.contact.address.detail}</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 leading-snug">
                <Mail size={16} className="text-[#DC2626] shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.contact.email.primary}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {siteConfig.contact.email.primary}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 leading-snug">
                <Phone size={16} className="text-[#DC2626] shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.contact.phone.value}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra Legal Inferior (Sin la fecha/horario como se solicitó) */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            <span>&copy; {new Date().getFullYear()} {siteConfig.company.legalName} · RUC {siteConfig.company.ruc}</span>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Términos y Condiciones
            </button>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Política de Privacidad
            </button>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <Link
              to="/contacto"
              className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              Libro de Reclamaciones
            </Link>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span>Desarrollado por Rodrigo Ormeño</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
