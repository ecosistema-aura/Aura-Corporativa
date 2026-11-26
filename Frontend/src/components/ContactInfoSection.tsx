import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, User, LoaderCircle, Check } from 'lucide-react';
import logoAuraMini from '../assets/logo_aura_mini.jpg';
import { siteConfig } from '../config/siteConfig';
import { contactoService } from '../services/contactoService';
import type { LeadPayload } from '../types';

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
}

interface ContactInfoProps {
  onOpenPrivacy?: () => void;
}

export const ContactInfoSection: React.FC<ContactInfoProps> = ({ onOpenPrivacy }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField((curr) => (curr === field ? null : curr));
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((current) => ({ ...current, [e.target.name]: undefined }));
    setSuccessMessage('');
    setSubmitError('');
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!formData.nombre.trim()) nextErrors.nombre = 'Ingresa tu nombre.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = 'Ingresa un email válido.';
    if (!formData.mensaje.trim()) nextErrors.mensaje = 'Cuéntanos cómo podemos ayudarte.';
    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSuccessMessage('');
    setSubmitError('');

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const payload: LeadPayload = {
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim() || undefined,
        mensaje: formData.mensaje.trim(),
        tipo: 'contacto',
      };
      await contactoService.enviarContacto(payload);
      setSuccessMessage('Solicitud enviada correctamente. Nos pondremos en contacto pronto.');
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
    } catch (error) {
      console.error('Error al enviar contacto:', error);
      setSubmitError('No pudimos enviar tu solicitud. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-md border text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#DC2626] ${
      errors[field] ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
    }`;

  return (
    <section id="contacto" className="relative overflow-hidden py-20 surface-relief-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title matching mockup */}
        <div className="text-center mb-14 reveal-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contacto & <span className="text-[#DC2626]">Atención</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Form Card matching mockup */}
          <div className="card-relief-light rounded-xl border border-[#0D1B2A]/15 p-6 sm:p-8 relative reveal-up">
            {/* Top red accent border line */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#0D1B2A] via-[#DC2626] to-[#0D1B2A] rounded-t" />

            <h3 className="text-lg font-bold text-slate-900 mb-6 text-center sm:text-left">
              Permita que lo Contactemos
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={inputClass('nombre')}
                  aria-invalid={Boolean(errors.nombre)}
                />
                {errors.nombre && <p className="mt-1 text-xs text-red-600">{errors.nombre}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass('email')}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={inputClass('telefono')}
                />
              </div>

              <div>
                <textarea
                  name="mensaje"
                  rows={3}
                  placeholder="Mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className={`${inputClass('mensaje')} resize-none`}
                  aria-invalid={Boolean(errors.mensaje)}
                />
                {errors.mensaje && <p className="mt-1 text-xs text-red-600">{errors.mensaje}</p>}
              </div>

              {successMessage && <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700" role="status">{successMessage}</p>}
              {submitError && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{submitError}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-[#DC2626] hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base rounded-md transition-colors shadow-xs cursor-pointer inline-flex items-center justify-center gap-2"
              >
                {isSubmitting && <LoaderCircle size={18} className="animate-spin" />}
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-3">
                Al enviar este formulario aceptas nuestra{' '}
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-slate-600 underline hover:text-[#DC2626] transition-colors cursor-pointer"
                >
                  Política de Privacidad
                </button>.
              </p>
            </form>
          </div>

          {/* Right: Contact items & Google Maps */}
          <div className="space-y-6 reveal-up delay-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone - Click to Copy */}
              <button
                type="button"
                onClick={() => handleCopy(siteConfig.contact.phone.display, 'phone')}
                className="group relative flex items-center gap-3 bg-white hover:bg-red-50/50 p-4 rounded-xl border border-slate-200/80 hover:border-[#DC2626] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer text-left w-full"
                title="Haz clic para copiar el número de teléfono"
              >
                <div className="w-11 h-11 rounded-full bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-xs">
                  {copiedField === 'phone' ? <Check size={18} className="text-white" /> : <Phone size={18} />}
                </div>
                <div className="min-w-0 grow">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-[#DC2626] transition-colors truncate">
                    {siteConfig.contact.phone.display}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center justify-between">
                    <span>{siteConfig.contact.phone.label}</span>
                    <span className="text-[10px] font-semibold text-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedField === 'phone' ? '¡Copiado!' : 'Copiar'}
                    </span>
                  </div>
                </div>
              </button>

              {/* Email - Click to Copy */}
              <button
                type="button"
                onClick={() => handleCopy(siteConfig.contact.email.primary, 'email')}
                className="group relative flex items-center gap-3 bg-white hover:bg-red-50/50 p-4 rounded-xl border border-slate-200/80 hover:border-[#DC2626] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer text-left w-full"
                title="Haz clic para copiar el correo electrónico"
              >
                <div className="w-11 h-11 rounded-full bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-xs">
                  {copiedField === 'email' ? <Check size={18} className="text-white" /> : <Mail size={18} />}
                </div>
                <div className="min-w-0 grow">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-[#DC2626] transition-colors truncate">
                    {siteConfig.contact.email.primary}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center justify-between">
                    <span>{siteConfig.contact.email.label}</span>
                    <span className="text-[10px] font-semibold text-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedField === 'email' ? '¡Copiado!' : 'Copiar'}
                    </span>
                  </div>
                </div>
              </button>

              {/* Advisor */}
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="w-11 h-11 rounded-full bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <User size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-800 truncate">
                    {siteConfig.contact.advisor.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {siteConfig.contact.advisor.label}
                  </div>
                </div>
              </div>

              {/* Location / Address - Click to Copy */}
              <button
                type="button"
                onClick={() => handleCopy(`${siteConfig.contact.address.detail}, ${siteConfig.contact.address.city}`, 'address')}
                className="group relative flex items-center gap-3 bg-white hover:bg-red-50/50 p-4 rounded-xl border border-slate-200/80 hover:border-[#DC2626] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer text-left w-full"
                title="Haz clic para copiar la dirección"
              >
                <div className="w-11 h-11 rounded-full bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-xs">
                  {copiedField === 'address' ? <Check size={18} className="text-white" /> : <MapPin size={18} />}
                </div>
                <div className="min-w-0 grow">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-[#DC2626] transition-colors truncate">
                    {siteConfig.contact.address.detail}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center justify-between">
                    <span>{siteConfig.contact.address.coverage}</span>
                    <span className="text-[10px] font-semibold text-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedField === 'address' ? '¡Copiado!' : 'Copiar'}
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Google Maps Container */}
            <div className="bg-white rounded-xl border border-[#0D1B2A]/15 overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B192C]">
                  <MapPin size={14} className="text-[#DC2626]" />
                  <span>Ubicación de Atención & Cobertura</span>
                </div>
                <a
                  href={siteConfig.contact.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-[#DC2626] hover:underline"
                >
                  Abrir en Google Maps ↗
                </a>
              </div>
              <div className="w-full h-52 sm:h-56 relative bg-slate-100">
                <iframe
                  title="Ubicación Aura Corporativa"
                  src={siteConfig.contact.address.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to action button leading to /nosotros */}
        <div className="mt-12 sm:mt-16 text-center flex justify-center reveal-up delay-2">
          <Link
            to="/nosotros"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0B192C] hover:bg-[#142842] active:scale-95 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-[#0B192C]"
          >
            <span>Conoce más de nosotros</span>
            <img 
              src={logoAuraMini} 
              alt="Aura Corporativa" 
              className="h-6 w-auto object-contain rounded-xs" 
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
