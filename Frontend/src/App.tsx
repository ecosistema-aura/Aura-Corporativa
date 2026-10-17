import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { ServiciosPage } from './pages/ServiciosPage';
import { PorQueAuraPage } from './pages/PorQueAuraPage';
import { NosotrosPage } from './pages/NosotrosPage';
import { BlogPage } from './pages/BlogPage';
import { BlogAdminPage } from './pages/BlogAdminPage';
import { FaqPage } from './pages/FaqPage';
import { ContactoPage } from './pages/ContactoPage';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { LegalModal } from './components/LegalModal';
import type { LegalModalType } from './components/LegalModal';
import { scrollToElementAnimated } from './utils/scrollUtils';
import { initScrollReveal } from './utils/scrollReveal';

function RouteNavigationHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Inicializar y observar elementos reveal al cambiar de ruta
    const cleanupReveal = initScrollReveal();

    if (hash) {
      // Pequeño timeout para permitir que el DOM y la transición de entrada se monten
      const timer = setTimeout(() => {
        scrollToElementAnimated(hash, 80, 700);
      }, 120);
      return () => {
        clearTimeout(timer);
        cleanupReveal?.();
      };
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    return () => {
      cleanupReveal?.();
    };
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition-enter flex flex-col grow">
      <Routes location={location}>
        <Route path="/" element={<LandingPage onOpenPrivacy={onOpenPrivacy} />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/por-que-aura" element={<PorQueAuraPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contacto" element={<ContactoPage onOpenPrivacy={onOpenPrivacy} />} />
        <Route path="/admin-blog" element={<BlogAdminPage />} />
      </Routes>
    </div>
  );
}

export function App() {
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <RouteNavigationHandler />
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
        {/* Encabezado con Enrutamiento */}
        <Navbar isMenuOpen={isMobileMenuOpen} onMenuToggle={setIsMobileMenuOpen} />

        {/* Rutas de la Aplicación con Transición Suave */}
        <AnimatedRoutes onOpenPrivacy={() => setLegalModal('privacy')} />

        {/* Pie de Página */}
        <Footer 
          onOpenTerms={() => setLegalModal('terms')} 
          onOpenPrivacy={() => setLegalModal('privacy')} 
        />

        {/* Botón Flotante para Volver Arriba */}
        <ScrollToTopButton isHidden={isMobileMenuOpen} />

        {/* Botón Flotante de WhatsApp */}
        <WhatsAppButton isHidden={isMobileMenuOpen} />

        {/* Modal Legal */}
        <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
