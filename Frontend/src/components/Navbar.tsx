import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import logoAura from '../assets/logo_aura.jpg';
import { siteConfig } from '../config/siteConfig';

interface NavbarProps {
  isMenuOpen?: boolean;
  onMenuToggle?: (isOpen: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, onMenuToggle }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isMenuOpen !== undefined ? isMenuOpen : internalOpen;
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isServicios = location.pathname === '/servicios';
  const isPorQueAura = location.pathname === '/por-que-aura';
  const isNosotros = location.pathname === '/nosotros';
  const isBlog = location.pathname === '/blog' || location.pathname.startsWith('/blog/');
  const isFaq = location.pathname === '/faq';
  const isContacto = location.pathname === '/contacto';

  const handleToggle = (open: boolean) => {
    setInternalOpen(open);
    onMenuToggle?.(open);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItemClass = (isActive: boolean) =>
    `relative py-1 transition-all duration-300 cursor-pointer ${
      isActive
        ? 'text-[#DC2626] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-[#DC2626] after:rounded-full after:transition-all after:duration-300'
        : 'text-slate-700 hover:text-[#DC2626]'
    }`;

  const mobileItemClass = (isActive: boolean) =>
    `text-lg font-semibold py-2 px-3 rounded-lg flex items-center transition-colors cursor-pointer ${
      isActive ? 'bg-red-50 text-[#DC2626]' : 'text-slate-800 hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo oficial */}
        <Link
          to="/"
          onClick={() => {
            handleToggle(false);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          className="flex items-center select-none py-1 z-50 cursor-pointer"
        >
          <img 
            src={logoAura} 
            alt="Aura Corporativa" 
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-base font-medium text-slate-700">
          <Link
            to="/"
            onClick={() => handleToggle(false)}
            className={navItemClass(isHome)}
          >
            Inicio
          </Link>

          <Link
            to="/servicios"
            onClick={() => handleToggle(false)}
            className={navItemClass(isServicios)}
          >
            Servicios
          </Link>

          <Link
            to="/por-que-aura"
            onClick={() => handleToggle(false)}
            className={navItemClass(isPorQueAura)}
          >
            ¿Por qué Aura?
          </Link>

          <Link
            to="/nosotros"
            onClick={() => handleToggle(false)}
            className={navItemClass(isNosotros)}
          >
            Nosotros
          </Link>

          <Link
            to="/blog"
            onClick={() => handleToggle(false)}
            className={navItemClass(isBlog)}
          >
            Blog
          </Link>

          <Link
            to="/faq"
            onClick={() => handleToggle(false)}
            className={navItemClass(isFaq)}
          >
            FAQ
          </Link>
        </nav>

        {/* Right Desktop CTA + Mobile Hamburger Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/contacto"
            onClick={() => handleToggle(false)}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm sm:text-base font-semibold rounded-md transition-all shadow-xs cursor-pointer ${
              isContacto
                ? 'bg-red-700 text-white ring-2 ring-[#DC2626] ring-offset-2'
                : 'text-white bg-[#DC2626] hover:bg-red-700 active:scale-95'
            }`}
          >
            Solicitar Contacto
          </Link>

          {/* Botón de Hamburguesa */}
          <button
            type="button"
            onClick={() => handleToggle(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:text-[#DC2626] hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-red-500 z-50 cursor-pointer"
          >
            {isOpen ? <X size={26} className="text-slate-900" /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden animate-modal-backdrop-in"
          onClick={() => handleToggle(false)}
        >
          <div
            className="bg-white border-b border-slate-200 px-6 py-8 shadow-2xl flex flex-col space-y-5 animate-modal-card-in"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col space-y-2.5">
              <Link
                to="/"
                onClick={() => handleToggle(false)}
                className={mobileItemClass(isHome)}
              >
                <span>Inicio</span>
              </Link>

              <Link
                to="/servicios"
                onClick={() => handleToggle(false)}
                className={mobileItemClass(isServicios)}
              >
                <span>Servicios</span>
              </Link>

              <Link
                to="/por-que-aura"
                onClick={() => handleToggle(false)}
                className={mobileItemClass(isPorQueAura)}
              >
                <span>¿Por qué Aura?</span>
              </Link>

              <Link
                to="/nosotros"
                onClick={() => handleToggle(false)}
                className={mobileItemClass(isNosotros)}
              >
                <span>Nosotros</span>
              </Link>

              <Link
                to="/blog"
                onClick={() => handleToggle(false)}
                className={mobileItemClass(isBlog)}
              >
                <span>Blog</span>
              </Link>

              <Link
                to="/faq"
                onClick={() => handleToggle(false)}
                className={mobileItemClass(isFaq)}
              >
                <span>FAQ</span>
              </Link>
            </nav>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <Link
                to="/contacto"
                onClick={() => handleToggle(false)}
                className={`w-full py-3.5 px-4 text-white font-bold text-base rounded-lg transition-colors text-center shadow-xs flex items-center justify-center cursor-pointer ${
                  isContacto
                    ? 'bg-red-700 ring-2 ring-[#DC2626] ring-offset-2'
                    : 'bg-[#DC2626] hover:bg-red-700'
                }`}
              >
                Solicitar Contacto
              </Link>

              <a
                href={'tel:' + siteConfig.contact.phone.value}
                className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={16} className="text-[#DC2626]" />
                <span>Llamar: {siteConfig.contact.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
