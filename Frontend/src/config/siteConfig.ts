/**
 * Configuración Centralizada de Negocio y Contacto para Aura Corporativa.
 * Reemplaza los valores de este archivo con la información oficial del cliente.
 */
export const siteConfig = {
  domain: 'https://auracorporativa.pe', // Reemplazar con el dominio oficial definitivo al adquirirlo
  company: {
    name: 'Aura Corporativa',
    legalName: 'ZWE CORPORATIVA S.A.C.',
    ruc: '20614340593',
    tagline: 'Tercerización y Outsourcing Empresarial',
    description: 'Soluciones integrales de tercerización de personal, planillas, gestión integral y soporte administrativo para empresas en Perú.',
  },
  contact: {
    phone: {
      display: '+51 913 738 990',
      value: '+51913738990',
      label: 'Central de atención',
    },
    whatsapp: {
      display: '+51 913 738 990',
      value: '+51913738990',
      defaultMessage: 'Hola Aura Corporativa, deseo recibir información sobre sus servicios de tercerización.',
    },
    email: {
      primary: 'ventas@zwecorporativa.com',
      label: 'Correo electrónico',
    },
    address: {
      city: 'Lima, Perú',
      detail: 'Jesús María, Lima - Perú',
      coverage: 'Cobertura a nivel nacional',
      googleMapsEmbed: 'https://maps.google.com/maps?q=-12.0836579,-77.0449196&hl=es&z=17&output=embed',
      googleMapsUrl: 'https://maps.app.goo.gl/pNFG3zjYk7QExEek6',
    },
    advisor: {
      name: 'Asesoría Corporativa',
      label: 'Atención ejecutiva',
    },
  },
  social: {
    facebook: 'https://facebook.com/auracorporativa',
    instagram: 'https://www.instagram.com/aura.corporativa?igsi=ZG4wbjJwdTcza3Rr',
    tiktok: 'https://www.tiktok.com/@aura.corporativa',
  },
  navigation: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Beneficios', href: '#beneficios' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ],
};

export default siteConfig;
