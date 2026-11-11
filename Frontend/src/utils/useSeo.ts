import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import siteConfig from '../config/siteConfig';

interface PageSeo {
  title: string;
  description: string;
  keywords?: string;
}

const pageSeoData: Record<string, PageSeo> = {
  '/': {
    title: 'Aura Corporativa | Tercerización y Outsourcing Empresarial en Perú',
    description: 'Soluciones integrales de tercerización de personal, gestión de planillas, reclutamiento y soporte administrativo en Perú. Optimiza la operatividad de tu empresa.',
    keywords: 'tercerizacion de personal, outsourcing empresarial, gestion de planillas, recursos humanos, administracion empresas lima peru, reclutamiento y seleccion'
  },
  '/servicios': {
    title: 'Servicios de Tercerización y Planillas | Aura Corporativa',
    description: 'Descubre nuestras soluciones de outsourcing: tercerización de personal, administración de planillas, gestión integral y soporte administrativo en Lima y todo el Perú.',
    keywords: 'servicios de tercerizacion, outsourcing de planillas, administracion de nominas peru, soporte administrativo lima'
  },
  '/por-que-aura': {
    title: '¿Por qué elegir Aura? | Ventajas de Tercerización y Outsourcing',
    description: 'Conoce las ventajas competitivas de Aura Corporativa: respaldo legal de ZWE, cumplimiento normativo 100%, optimización de costos y atención personalizada.',
    keywords: 'ventajas outsourcing peru, beneficios tercerizar personal, por que tercerizar lima'
  },
  '/nosotros': {
    title: 'Sobre Nosotros | Aura Corporativa - Socios Estratégicos en RRHH',
    description: 'Somos una empresa peruana especializada en tercerización y gestión de capital humano respaldada por el grupo ZWE Corporativa S.A.C.',
    keywords: 'nosotros aura corporativa, empresa outsourcing lima, zwe corporativa sac'
  },
  '/blog': {
    title: 'Blog de Gestión Empresarial y RRHH | Aura Corporativa',
    description: 'Artículos y consejos sobre legislación laboral peruana, contratación de personal, tercerización formal y administración eficiente de nóminas.',
    keywords: 'blog recursos humanos peru, leyes laborales tercerizacion, gestion laboral pymes'
  },
  '/faq': {
    title: 'Preguntas Frecuentes sobre Tercerización | Aura Corporativa',
    description: 'Respuestas claras sobre tercerización de personal, intermediación laboral, administración de planillas y marco legal en Perú.',
    keywords: 'dudas tercerizacion de personal, requisitos tercerizacion peru ley 29245'
  },
  '/contacto': {
    title: 'Contacto y Cotizaciones de Tercerización | Aura Corporativa',
    description: 'Solicita una asesoría y cotización personalizada de tercerización de personal o planillas para tu empresa. WhatsApp: +51 913 738 990.',
    keywords: 'cotizar outsourcing personal lima, contacto aura corporativa, telefono tercerizacion'
  }
};

export function useSeo() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const seo = pageSeoData[pathname] || {
      title: 'Aura Corporativa | Tercerización y Outsourcing Empresarial',
      description: siteConfig.company.description
    };

    // Actualizar Título
    document.title = seo.title;

    // Actualizar Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', seo.description);
    }

    // Actualizar Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    const fullUrl = `${siteConfig.domain}${pathname === '/' ? '' : pathname}`;
    if (ogUrl) ogUrl.setAttribute('content', fullUrl);

    // Actualizar Twitter Card
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', seo.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', seo.description);

    // Actualizar Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    }
  }, [location.pathname]);
}
