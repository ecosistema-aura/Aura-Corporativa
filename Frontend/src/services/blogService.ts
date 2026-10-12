import { supabase } from './supabaseClient';
import type { BlogPost, BlogPostPayload } from '../types';

export const BLOG_ADMIN_TOKEN_KEY = 'aura-blog-admin-token';
export const ADMIN_PIN = 'aura2026';

export interface BlogAdminUser {
  id: number;
  name: string;
  email: string;
}

export class BlogApiError extends Error {
  status: number;
  fieldErrors: Record<string, string[]>;

  constructor(message: string, status: number = 400, fieldErrors: Record<string, string[]> = {}) {
    super(message);
    this.name = 'BlogApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Fallback initial posts si hay algún problema de red
const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: 'El impacto del nuevo valor de la UIT en su planilla y las multas de SUNAFIL',
    date: '07 Feb, 2026',
    category: 'Laboral',
    desc: 'Con el inicio del año fiscal y la actualización del valor de la Unidad Impositiva Tributaria (UIT), las reglas de juego cambian tanto para las escalas salariales, retenciones de quinta categoría y las sanciones aplicadas por SUNAFIL.',
    image: 'Sunafil.webp',
    slug: 'el-impacto-del-nuevo-valor-de-la-uit-en-su-planilla-y-las-multas-de-sunafil',
    excerpt: 'Con el inicio del año fiscal y la actualización del valor de la Unidad Impositiva Tributaria (UIT), las reglas de juego cambian tanto para las escalas salariales, retenciones de quinta categoría y las sanciones aplicadas por SUNAFIL.',
    content: 'Con el inicio del año fiscal y la actualización del valor de la Unidad Impositiva Tributaria (UIT), las reglas de juego cambian tanto para las escalas salariales, retenciones de quinta categoría y las sanciones aplicadas por SUNAFIL.',
    image_url: '/assets/images/blog/Sunafil.webp',
    published: true,
    published_at: '2026-02-07',
  },
  {
    id: 2,
    title: 'Más allá de la supervivencia: 5 Estrategias para blindar el Flujo de Caja este año',
    date: '07 Feb, 2026',
    category: 'Finanzas',
    desc: 'En un entorno económico volátil, el efectivo es el rey. Muchas empresas peruanas rentables quiebran no por falta de ventas, sino por falta de liquidez en los momentos clave.',
    image: 'Caja.webp',
    slug: 'mas-alla-de-la-supervivencia-5-estrategias-para-blindar-el-flujo-de-caja-este-ano',
    excerpt: 'En un entorno económico volátil, el efectivo es el rey. Muchas empresas peruanas rentables quiebran no por falta de ventas, sino por falta de liquidez en los momentos clave.',
    content: 'En un entorno económico volátil, el efectivo es el rey. Muchas empresas peruanas rentables quiebran no por falta de ventas, sino por falta de liquidez en los momentos clave.',
    image_url: '/assets/images/blog/Caja.webp',
    published: true,
    published_at: '2026-02-07',
  },
  {
    id: 3,
    title: 'El Desafío del SIRE: Por qué no debes aceptar la «Propuesta Automática» de SUNAT sin revisar',
    date: '07 Feb, 2026',
    category: 'Tributario',
    desc: 'La implementación del Sistema Integrado de Registros Electrónicos (SIRE) exige que las empresas comparen minuciosamente sus comprobantes físicos y electrónicos antes de aceptar cualquier propuesta.',
    image: 'SIS.webp',
    slug: 'el-desafio-del-sire-por-que-no-debes-aceptar-la-propuesta-automatica-de-sunat-sin-revisar',
    excerpt: 'La implementación del Sistema Integrado de Registros Electrónicos (SIRE) exige que las empresas comparen minuciosamente sus comprobantes físicos y electrónicos antes de aceptar cualquier propuesta.',
    content: 'La implementación del Sistema Integrado de Registros Electrónicos (SIRE) exige que las empresas comparen minuciosamente sus comprobantes físicos y electrónicos antes de aceptar cualquier propuesta.',
    image_url: '/assets/images/blog/SIS.webp',
    published: true,
    published_at: '2026-02-07',
  },
  {
    id: 4,
    title: 'Declaración Anual del Impuesto a la Renta: Cómo afrontar el cierre fiscal sin contingencias',
    date: '31 Ene, 2026',
    category: 'Contabilidad',
    desc: 'La campaña de la Declaración Jurada Anual del Impuesto a la Renta es el hito más crítico para cualquier empresa. Conoce los gastos deducibles y cómo evitar observaciones.',
    image: 'Noticia1.webp',
    slug: 'declaracion-anual-del-impuesto-a-la-renta-como-afrontar-el-cierre-fiscal-sin-contingencias',
    excerpt: 'La campaña de la Declaración Jurada Anual del Impuesto a la Renta es el hito más crítico para cualquier empresa. Conoce los gastos deducibles y cómo evitar observaciones.',
    content: 'La campaña de la Declaración Jurada Anual del Impuesto a la Renta es el hito más crítico para cualquier empresa. Conoce los gastos deducibles y cómo evitar observaciones.',
    image_url: '/assets/images/blog/Noticia1.webp',
    published: true,
    published_at: '2026-01-31',
  },
];

function normalizePost(row: any): BlogPost {
  const title = row.title || '';
  const desc = row.desc || row.excerpt || row.content || '';
  const image = row.image || row.image_url || 'Noticia1.webp';
  const postSlug = row.slug || slugify(title);
  const imageUrl = blogService.getImageUrl(image);

  return {
    id: Number(row.id),
    title,
    category: row.category || 'Laboral',
    date: row.date || (row.created_at ? new Date(row.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Reciente'),
    desc,
    image,
    link: row.link || null,
    slug: postSlug,
    excerpt: desc,
    content: desc,
    image_url: imageUrl,
    published: row.published !== undefined ? Boolean(row.published) : true,
    published_at: row.published_at || row.created_at || null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export const blogService = {
  getImageUrl(image?: string | null): string {
    if (!image) return '/assets/images/blog/Noticia1.webp';
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
      return image;
    }
    return `/assets/images/blog/${image}`;
  },

  async uploadImage(file: File): Promise<string> {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}_${cleanFileName}`;

    const { error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error(`Error al subir imagen: ${error.message}`);
    }

    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  },

  async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.warn('Error consultando Supabase posts, usando fallback:', error.message);
        return defaultPosts;
      }

      if (data && data.length > 0) {
        return data.map(normalizePost);
      }

      return defaultPosts;
    } catch (err) {
      console.warn('Fallo de conexión en getPublishedPosts:', err);
      return defaultPosts;
    }
  },

  async getPublishedPost(slug: string): Promise<BlogPost> {
    const all = await this.getPublishedPosts();
    const found = all.find((p) => p.slug === slug || String(p.id) === slug);
    if (!found) {
      throw new Error('No se encontró la noticia solicitada.');
    }
    return found;
  },

  async login(password: string): Promise<{ token: string; user: BlogAdminUser }> {
    // Acepta clave configurada para el panel (aura2026, zwe2026 o similar)
    const normalized = password.trim();
    if (normalized === ADMIN_PIN || normalized === 'zwe2026' || normalized === 'aura' || normalized === 'admin1234') {
      const user: BlogAdminUser = {
        id: 1,
        name: 'Administrador Aura',
        email: 'ventas@zwecorporativa.com',
      };
      const token = `aura-session-${Date.now()}`;
      return { token, user };
    }

    // Si hay backend API disponible, intentamos como fallback
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://aura-api-production-75ca.up.railway.app/api';
      const response = await fetch(`${apiBase}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Ignorar fallback si no está disponible
    }

    throw new BlogApiError('La clave de acceso no es correcta.', 422, {
      password: ['La clave de acceso no es correcta.'],
    });
  },

  async getAdminUser(token: string): Promise<BlogAdminUser> {
    if (!token) throw new BlogApiError('No autenticado', 401);
    return {
      id: 1,
      name: 'Administrador Aura',
      email: 'ventas@zwecorporativa.com',
    };
  },

  async getAdminPosts(_token?: string): Promise<BlogPost[]> {
    return this.getPublishedPosts();
  },

  async createPost(_token: string, payload: BlogPostPayload): Promise<BlogPost> {
    const postRecord = {
      title: payload.title.trim(),
      category: payload.category,
      date: payload.date.trim(),
      desc: payload.desc.trim(),
      image: payload.image.trim() || 'Noticia1.webp',
      link: payload.link?.trim() || null,
    };

    const { data, error } = await supabase
      .from('posts')
      .insert([postRecord])
      .select()
      .single();

    if (error) {
      throw new Error(`Error al publicar la noticia en Supabase: ${error.message}`);
    }

    return normalizePost(data);
  },

  async updatePost(_token: string, id: number, payload: BlogPostPayload): Promise<BlogPost> {
    const postRecord = {
      title: payload.title.trim(),
      category: payload.category,
      date: payload.date.trim(),
      desc: payload.desc.trim(),
      image: payload.image.trim() || 'Noticia1.webp',
      link: payload.link?.trim() || null,
    };

    const { data, error } = await supabase
      .from('posts')
      .update(postRecord)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al actualizar noticia en Supabase: ${error.message}`);
    }

    return normalizePost(data);
  },

  async deletePost(_token: string, id: number): Promise<{ message: string }> {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error al eliminar noticia en Supabase: ${error.message}`);
    }

    return { message: 'Noticia eliminada correctamente.' };
  },

  async logout(_token: string): Promise<{ message: string }> {
    return { message: 'Sesión cerrada correctamente.' };
  },
};
