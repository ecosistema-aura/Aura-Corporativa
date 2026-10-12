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

// Noticias oficiales por defecto de Aura Corporativa (Tercerización, Planillas y Outsourcing)
const defaultPosts: BlogPost[] = [
  {
    id: 5,
    title: 'Tercerización de Personal en Perú: Claves y normativa legal para 2026',
    date: '10 Oct, 2026',
    category: 'Laboral',
    desc: 'Conozca los requisitos esenciales, responsabilidades solidarias y mejores prácticas para contratar personal tercerizado sin contingencias laborales ante SUNAFIL.',
    image: 'tercerizacion_personal.png',
    empresa: 'aura',
    slug: 'tercerizacion-de-personal-en-peru-claves-y-normativa-legal-para-2026',
    excerpt: 'Conozca los requisitos esenciales, responsabilidades solidarias y mejores prácticas para contratar personal tercerizado sin contingencias laborales ante SUNAFIL.',
    content: 'Conozca los requisitos esenciales, responsabilidades solidarias y mejores prácticas para contratar personal tercerizado sin contingencias laborales ante SUNAFIL.',
    image_url: '/assets/images/blog/tercerizacion_personal.png',
    published: true,
    published_at: '2026-10-10',
  },
  {
    id: 6,
    title: 'Gestión de Planillas y Payroll: Cómo evitar errores en el cálculo de beneficios',
    date: '08 Oct, 2026',
    category: 'Finanzas',
    desc: 'El procesamiento puntual y exacto de haberes, gratificaciones, CTS y retenciones tributarias (PLAME) es indispensable para la seguridad laboral de su empresa.',
    image: 'administracion_planillas.png',
    empresa: 'aura',
    slug: 'gestion-de-planillas-y-payroll-como-evitar-errores-en-el-calculo-de-beneficios',
    excerpt: 'El procesamiento puntual y exacto de haberes, gratificaciones, CTS y retenciones tributarias (PLAME) es indispensable para la seguridad laboral de su empresa.',
    content: 'El procesamiento puntual y exacto de haberes, gratificaciones, CTS y retenciones tributarias (PLAME) es indispensable para la seguridad laboral de su empresa.',
    image_url: '/assets/images/blog/administracion_planillas.png',
    published: true,
    published_at: '2026-10-08',
  },
  {
    id: 7,
    title: 'Outsourcing y Soporte Administrativo: Eficiencia operativa para su empresa',
    date: '05 Oct, 2026',
    category: 'Contabilidad',
    desc: 'Delegar el soporte administrativo y la gestión operativa permite a las organizaciones concentrarse al 100% en el crecimiento y rentabilidad de su negocio principal.',
    image: 'soporte_administrativo.png',
    empresa: 'aura',
    slug: 'outsourcing-y-soporte-administrativo-eficiencia-operativa-para-su-empresa',
    excerpt: 'Delegar el soporte administrativo y la gestión operativa permite a las organizaciones concentrarse al 100% en el crecimiento y rentabilidad de su negocio principal.',
    content: 'Delegar el soporte administrativo y la gestión operativa permite a las organizaciones concentrarse al 100% en el crecimiento y rentabilidad de su negocio principal.',
    image_url: '/assets/images/blog/soporte_administrativo.png',
    published: true,
    published_at: '2026-10-05',
  },
];

function normalizePost(row: any): BlogPost {
  const title = row.title || '';
  const desc = row.desc || row.excerpt || row.content || '';
  const image = row.image || row.image_url || 'tercerizacion_personal.png';
  const postSlug = row.slug || slugify(title);
  const imageUrl = blogService.getImageUrl(image);

  return {
    id: Number(row.id),
    title,
    category: row.category || 'Laboral',
    date: row.date || (row.created_at ? new Date(row.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Reciente'),
    desc,
    image,
    empresa: row.empresa || 'aura',
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
    if (!image) return '/assets/images/blog/tercerizacion_personal.png';
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
      // Filtrar estrictamente por empresa = 'aura'
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('empresa', 'aura')
        .order('id', { ascending: false });

      if (error) {
        console.warn('Error consultando Supabase posts de Aura, usando fallback:', error.message);
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

    // Fallback a API Laravel si estuviera configurada
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
      image: payload.image.trim() || 'tercerizacion_personal.png',
      link: payload.link?.trim() || null,
      empresa: 'aura',
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
      image: payload.image.trim() || 'tercerizacion_personal.png',
      link: payload.link?.trim() || null,
      empresa: 'aura',
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
