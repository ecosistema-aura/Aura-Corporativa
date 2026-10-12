import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  LoaderCircle,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  UploadCloud,
  X,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logoAura from '../assets/logo_aura_mini.jpg';
import {
  BLOG_ADMIN_TOKEN_KEY,
  BlogApiError,
  blogService,
  type BlogAdminUser,
} from '../services/blogService';
import type { BlogCategory, BlogPost } from '../types';

const categories: BlogCategory[] = ['Laboral', 'Finanzas', 'Tributario', 'Contabilidad'];

function getTodayFormatted(): string {
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = meses[now.getMonth()];
  const year = now.getFullYear();
  return `${day} ${month}, ${year}`;
}

interface PostFormData {
  id?: number;
  title: string;
  category: BlogCategory;
  date: string;
  desc: string;
  image: string;
  link: string;
}

function emptyForm(): PostFormData {
  return {
    title: '',
    category: 'Laboral',
    date: getTodayFormatted(),
    desc: '',
    image: '',
    link: '',
  };
}

export function BlogAdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(BLOG_ADMIN_TOKEN_KEY));
  const [admin, setAdmin] = useState<BlogAdminUser | null>(null);
  const [status, setStatus] = useState<'checking' | 'signedOut' | 'signedIn'>(() =>
    sessionStorage.getItem(BLOG_ADMIN_TOKEN_KEY) ? 'checking' : 'signedOut',
  );
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lista de noticias y estado
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Todas');

  // Mensajes de feedback
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Modal Crear / Editar Noticia
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postForm, setPostForm] = useState<PostFormData>(emptyForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Modal Confirmar Eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const loadPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const data = await blogService.getPublishedPosts();
      setPosts(data);
    } catch (err: any) {
      showToast('Error al cargar noticias: ' + (err.message || 'Error desconocido'), 'error');
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    let isMounted = true;
    blogService.getAdminUser(token)
      .then((user) => {
        if (!isMounted) return;
        setAdmin(user);
        setStatus('signedIn');
        return blogService.getPublishedPosts();
      })
      .then((data) => {
        if (isMounted && data) setPosts(data);
      })
      .catch((requestError: unknown) => {
        if (!isMounted) return;
        if (requestError instanceof BlogApiError && [401, 403].includes(requestError.status)) {
          sessionStorage.removeItem(BLOG_ADMIN_TOKEN_KEY);
          setToken(null);
          setStatus('signedOut');
        } else {
          setStatus('signedOut');
        }
        showToast('No se pudo verificar la sesión.', 'error');
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategoryFilter === 'Todas' ||
        post.category.toLowerCase() === selectedCategoryFilter.toLowerCase();
      const matchesSearch =
        !normalizedSearch ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.desc.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [posts, search, selectedCategoryFilter]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await blogService.login(password);
      sessionStorage.setItem(BLOG_ADMIN_TOKEN_KEY, result.token);
      setToken(result.token);
      setAdmin(result.user);
      setStatus('signedIn');
      setPassword('');
      showToast('¡Bienvenido al Panel de Noticias!', 'success');
      await loadPosts();
    } catch (requestError) {
      showToast(
        requestError instanceof Error ? requestError.message : 'No se pudo iniciar sesión.',
        'error',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await blogService.logout(token);
      } catch {
        // Ignorar error al cerrar sesión
      }
    }
    sessionStorage.removeItem(BLOG_ADMIN_TOKEN_KEY);
    setToken(null);
    setAdmin(null);
    setPosts([]);
    setStatus('signedOut');
  };

  // Abrir Modal de Creación
  const openCreateModal = () => {
    setIsEditing(false);
    setPostForm(emptyForm());
    setSelectedFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  // Abrir Modal de Edición
  const openEditModal = (post: BlogPost) => {
    setIsEditing(true);
    setPostForm({
      id: post.id,
      title: post.title,
      category: (post.category as BlogCategory) || 'Laboral',
      date: post.date || getTodayFormatted(),
      desc: post.desc,
      image: post.image || '',
      link: post.link || '',
    });
    setSelectedFile(null);
    setImagePreview(blogService.getImageUrl(post.image));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSaving) return;
    setIsModalOpen(false);
    setSelectedFile(null);
    setImagePreview(null);
  };

  // Manejo de Selección de Archivo de Imagen
  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar Noticia (Crear o Actualizar)
  const handleSavePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;

    if (!postForm.title.trim() || !postForm.desc.trim() || !postForm.category) {
      showToast('Por favor completa todos los campos requeridos.', 'error');
      return;
    }

    setIsSaving(true);

    try {
      let finalImageUrl = postForm.image;

      // Si subió un archivo nuevo, subir al bucket 'blog-images' de Supabase Storage
      if (selectedFile) {
        setIsUploading(true);
        finalImageUrl = await blogService.uploadImage(selectedFile);
        setIsUploading(false);
      }

      // Si no tiene imagen, asignar la imagen por defecto
      if (!finalImageUrl) {
        finalImageUrl = 'Noticia1.webp';
      }

      const payload = {
        title: postForm.title.trim(),
        category: postForm.category,
        date: postForm.date.trim() || getTodayFormatted(),
        desc: postForm.desc.trim(),
        image: finalImageUrl,
        link: postForm.link.trim() || undefined,
      };

      if (isEditing && postForm.id) {
        await blogService.updatePost(token, postForm.id, payload);
        showToast('¡Noticia actualizada exitosamente!', 'success');
      } else {
        await blogService.createPost(token, payload);
        showToast('¡Nueva noticia publicada con éxito!', 'success');
      }

      closeModal();
      await loadPosts();
    } catch (err: any) {
      showToast('Error al guardar: ' + (err.message || 'Error desconocido'), 'error');
    } finally {
      setIsSaving(false);
      setIsUploading(false);
    }
  };

  // Confirmar Eliminación
  const openDeleteModal = (post: BlogPost) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const handleDeletePost = async () => {
    if (!postToDelete || !token) return;

    setIsDeleting(true);
    try {
      await blogService.deletePost(token, postToDelete.id);
      showToast('Noticia eliminada correctamente.', 'success');
      closeDeleteModal();
      await loadPosts();
    } catch (err: any) {
      showToast('Error al eliminar: ' + (err.message || 'Error desconocido'), 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  if (status === 'checking') {
    return (
      <main className="flex grow items-center justify-center bg-[#FAFBFD] px-4 py-24">
        <p className="inline-flex items-center gap-2 text-slate-600" role="status">
          <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />
          Verificando sesión...
        </p>
      </main>
    );
  }

  // Pantalla de Login de Administrador
  if (status === 'signedOut') {
    return (
      <main className="flex grow items-center justify-center bg-gradient-to-br from-[#0B192C] to-slate-900 px-4 py-16">
        <section className="w-full max-w-md rounded-2xl border-t-4 border-[#DC2626] bg-white p-7 shadow-2xl sm:p-9">
          <div className="flex items-center justify-center">
            <img
              src={logoAura}
              alt="Aura Corporativa"
              className="h-14 w-14 rounded-lg object-contain shadow-sm"
            />
          </div>
          <h1 className="mt-6 text-center text-2xl font-black text-[#0B192C]">
            Panel de Noticias Blog
          </h1>
          <p className="mt-2 text-center text-sm leading-6 text-slate-500">
            Ingresa tu clave de acceso para administrar el blog.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <label className="block text-sm font-bold text-slate-800">
              Contraseña de Administrador
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#0B192C] focus:ring-2 focus:ring-slate-200"
                placeholder="Introduce la clave de acceso"
                autoFocus
              />
            </label>

            {toastMessage && toastType === 'error' && (
              <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                {toastMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B192C] px-4 py-3 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
              ) : (
                <LogIn size={18} aria-hidden="true" />
              )}
              Iniciar Sesión
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="grow bg-slate-50 min-h-screen">
      {/* Toast Alert flotante */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-xl transition-all animate-bounce text-sm font-semibold text-white bg-slate-900 border border-slate-700">
          {toastType === 'success' ? (
            <CheckCircle2 size={18} className="text-emerald-400" />
          ) : (
            <AlertTriangle size={18} className="text-red-400" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header del Gestor */}
      <section className="bg-[#0B192C] px-4 py-4 text-white sm:px-6 lg:px-8 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={logoAura}
              alt="Aura Corporativa"
              className="h-10 w-10 rounded bg-white p-1 object-contain shadow-xs"
            />
            <div>
              <h1 className="text-lg font-black tracking-tight">Gestor de Noticias</h1>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                En Vivo (Supabase Cloud){admin?.name ? ` · ${admin.name}` : ''}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 px-3.5 py-2 text-sm font-bold text-white transition border border-white/10"
              title="Ver Blog en vivo"
            >
              <ExternalLink size={15} aria-hidden="true" /> Ver Blog Web
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 text-red-300 hover:bg-red-500/20 px-3.5 py-2 text-sm font-bold transition"
            >
              <LogOut size={15} aria-hidden="true" /> Cerrar Sesión
            </button>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Barra de Controles: Búsqueda, Filtro y Botón Nueva Noticia */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            {/* Buscador */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar noticias por título o contenido..."
                className="w-full rounded-lg border border-slate-200 pl-10 pr-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C]"
              />
            </div>

            {/* Filtro de Categoría */}
            <select
              value={selectedCategoryFilter}
              onChange={(event) => setSelectedCategoryFilter(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-[#0B192C]"
            >
              <option value="Todas">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Botón Nueva Noticia */}
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#DC2626] hover:bg-red-700 px-4 py-2 text-sm font-bold text-white shadow-xs transition"
          >
            <Plus size={18} aria-hidden="true" /> Nueva Noticia
          </button>
        </div>

        {/* Fila de Estadísticas */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="rounded-full bg-white px-3.5 py-1.5 shadow-2xs border border-slate-100">
            <strong>{posts.length}</strong> noticias en total
          </span>
          <span className="rounded-full bg-white px-3.5 py-1.5 shadow-2xs border border-slate-100">
            Mostrando <strong>{filteredPosts.length}</strong> resultados
          </span>
          <button
            type="button"
            onClick={loadPosts}
            title="Clic para recargar"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 text-emerald-700 border border-emerald-200/60 transition"
          >
            <RefreshCw size={13} className={isLoadingPosts ? 'animate-spin' : ''} />
            Sincronizado
          </button>
        </div>

        {/* Estado de Carga */}
        {isLoadingPosts && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <LoaderCircle size={32} className="animate-spin text-[#0B192C]" />
            <p className="mt-3 text-sm font-medium">Cargando noticias desde Supabase...</p>
          </div>
        )}

        {/* Estado Vacío */}
        {!isLoadingPosts && filteredPosts.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No se encontraron noticias</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm">
              {search || selectedCategoryFilter !== 'Todas'
                ? 'Prueba cambiando los filtros o la búsqueda ingresada.'
                : 'Aún no has creado ninguna noticia. ¡Publica tu primer artículo!'}
            </p>
            {!search && selectedCategoryFilter === 'Todas' && (
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#DC2626] px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <Plus size={16} /> Publicar Noticia
              </button>
            )}
          </div>
        )}

        {/* Cuadrícula de Noticias */}
        {!isLoadingPosts && filteredPosts.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Portada con Badge de Categoría */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={blogService.getImageUrl(post.image)}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/blog/Noticia1.webp';
                    }}
                  />
                  <span className="absolute top-3 right-3 rounded bg-[#0B192C]/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs">
                    {post.category}
                  </span>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={14} className="text-slate-400" />
                      {post.date}
                    </span>
                    {post.link && (
                      <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                        <LinkIcon size={11} /> Link
                      </span>
                    )}
                  </div>

                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 group-hover:text-[#DC2626] transition-colors">
                    {post.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {post.desc}
                  </p>

                  {post.link && (
                    <div className="mt-3 truncate text-xs text-blue-600 hover:underline">
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 max-w-full truncate"
                      >
                        <ExternalLink size={12} className="shrink-0" />
                        <span className="truncate">{post.link}</span>
                      </a>
                    </div>
                  )}

                  {/* Botones de Acción (Editar / Eliminar) */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(post)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition"
                      title="Editar Noticia"
                    >
                      <Pencil size={13} /> Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal(post)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 transition"
                      title="Eliminar Noticia"
                    >
                      <Trash2 size={13} /> Eliminar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* MODAL CREAR / EDITAR NOTICIA (MISMOS INPUTS QUE ZWE)                      */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 my-8 overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/60">
              <h2 className="text-lg font-black text-[#0B192C]">
                {isEditing ? 'Editar Noticia' : 'Publicar Nueva Noticia'}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                disabled={isSaving}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSavePost} className="p-6 space-y-4.5">
              {/* 1. Título del Artículo */}
              <div>
                <label htmlFor="postTitle" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Título del Artículo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="postTitle"
                  required
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  placeholder="Ej: Nuevas normativas de SUNAFIL para MYPEs en 2026"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C]"
                />
              </div>

              {/* 2. Fila Categoría y Fecha de Publicación */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="postCategory" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="postCategory"
                    required
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value as BlogCategory })}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#0B192C]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="postDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Fecha de Publicación <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postDate"
                    required
                    value={postForm.date}
                    onChange={(e) => setPostForm({ ...postForm, date: e.target.value })}
                    placeholder="Ej: 05 Oct, 2026"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C]"
                  />
                </div>
              </div>

              {/* 3. Resumen / Contenido del Artículo */}
              <div>
                <label htmlFor="postDesc" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Resumen / Contenido del Artículo <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="postDesc"
                  rows={4}
                  required
                  value={postForm.desc}
                  onChange={(e) => setPostForm({ ...postForm, desc: e.target.value })}
                  placeholder="Describe los puntos clave del artículo..."
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C] resize-y"
                />
              </div>

              {/* 4. Enlace a la Noticia Completa (Opcional) */}
              <div>
                <label htmlFor="postLink" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Enlace a la Noticia Completa (Opcional){' '}
                  <span className="font-normal text-slate-500 text-[11px] normal-case">
                    (Ej: link de diario, portal de noticias o PDF)
                  </span>
                </label>
                <div className="relative mt-1.5">
                  <LinkIcon
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    type="url"
                    id="postLink"
                    value={postForm.link}
                    onChange={(e) => setPostForm({ ...postForm, link: e.target.value })}
                    placeholder="https://ejemplo.com/noticia-completa"
                    className="w-full rounded-lg border border-slate-300 pl-10 pr-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C]"
                  />
                </div>
              </div>

              {/* 5. Subida de Imagen con Dropzone y Vista Previa */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Imagen de la Noticia
                </label>
                <div className="space-y-3">
                  {/* Dropzone */}
                  <label
                    htmlFor="imageInput"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-5 text-center transition hover:border-[#DC2626] hover:bg-red-50/20"
                  >
                    <UploadCloud size={30} className="text-[#DC2626] mb-1" />
                    <span className="text-sm font-semibold text-slate-700">
                      Haz clic aquí para <strong>subir una imagen</strong> desde tu dispositivo
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5">
                      Formatos soportados: WEBP, PNG, JPG (máx. 5MB)
                    </span>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      onChange={handleFileSelected}
                      className="hidden"
                    />
                  </label>

                  {/* Vista Previa de la Imagen */}
                  {imagePreview && (
                    <div className="relative h-36 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 rounded bg-black/75 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                        Vista Previa
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSaving}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#DC2626] hover:bg-red-700 px-5 py-2 text-sm font-bold text-white transition disabled:opacity-60 shadow-xs"
                >
                  {isSaving && <LoaderCircle size={16} className="animate-spin" />}
                  <span>
                    {isSaving
                      ? isUploading
                        ? 'Subiendo imagen...'
                        : 'Guardando...'
                      : isEditing
                      ? 'Actualizar Noticia'
                      : 'Publicar Noticia'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL CONFIRMAR ELIMINACIÓN                                               */}
      {/* ========================================================================= */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
          onClick={closeDeleteModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 transition-all animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle size={22} />
              </div>
              <h2 className="text-lg font-black text-slate-900">¿Eliminar Noticia?</h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              ¿Estás seguro de que deseas eliminar la noticia:
            </p>
            <blockquote className="my-3 rounded-lg border-l-4 border-red-500 bg-slate-50 p-3 text-sm italic text-slate-800">
              "{postToDelete?.title}"
            </blockquote>
            <p className="text-xs text-slate-500">
              Esta acción no se puede deshacer y el artículo desaparecerá del blog web.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeletePost}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-bold text-white transition disabled:opacity-60 shadow-xs"
              >
                {isDeleting && <LoaderCircle size={16} className="animate-spin" />}
                <span>{isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
