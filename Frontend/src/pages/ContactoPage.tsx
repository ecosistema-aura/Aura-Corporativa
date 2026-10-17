import React from 'react';
import { ContactInfoSection } from '../components/ContactInfoSection';

interface ContactoPageProps {
  onOpenPrivacy?: () => void;
}

export const ContactoPage: React.FC<ContactoPageProps> = ({ onOpenPrivacy }) => {
  return (
    <main className="grow">
      {/* Banner de Cabecera */}
      <section className="bg-[#0B192C] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Contacto & <span className="text-[#DC2626]">Solicitudes</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Inicie hoy una alianza estratégica con Aura Corporativa. Complete el formulario o comuníquese directamente con nuestros ejecutivos de cuenta.
          </p>
        </div>
      </section>

      {/* Formulario y Datos de Contacto */}
      <ContactInfoSection onOpenPrivacy={onOpenPrivacy} />
    </main>
  );
};

export default ContactoPage;
