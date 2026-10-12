import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, ExternalLink, FileText, Search } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { blogService } from '../services/blogService';
import type { BlogCategory, BlogPost } from '../types';

const categories: Array<'Todos' | BlogCategory> = [
  'Todos',
  'Laboral',
  'Finanzas',
  'Tributario',
  'Contabilidad',
];

function formatDate(date?: string | null): string {
  if (!date) return 'Borrador';

  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const [imageFailed, setImageFailed] = useState(false);
  const displayDateStr = post.date || formatDate(post.published_at);
  const displayDesc = post.desc || post.excerpt || post.content || '';
  const imageUrl = post.image_url || (post.image ? blogService.getImageUrl(post.image) : null);

  const cardContent = (
    <>
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {imageUrl && !imageFailed ? (
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#0B192C] to-slate-700 text-white">
            <FileText size={42} aria-hidden="true" />
          </div>
        )}
        <span className="absolute right-3 top-3 rounded bg-[#0B192C] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
          {post.category}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded bg-[#0B192C]/90 px-3 py-1.5 text-xs font-semibold text-white">
          <CalendarDays size={14} aria-hidden="true" />
          {displayDateStr}
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <h2 className="line-clamp-2 text-lg font-bold leading-snug text-[#0B192C] transition-colors group-hover:text-[#DC2626]">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{displayDesc}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#DC2626]">
          {post.link ? 'Leer noticia completa' : 'Leer noticia'} <span aria-hidden="true">→</span>
        </span>
      </div>
    </>
  );

  if (post.link) {
    return (
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug || post.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {cardContent}
    </Link>
  );
}

export function BlogPage() {
  const { slug } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<'Todos' | BlogCategory>('Todos');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [postResult, setPostResult] = useState<{
    slug: string;
    post: BlogPost | null;
    error: string | null;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    blogService.getPublishedPosts()
      .then((data) => {
        if (isMounted) setPosts(data);
      })
      .catch((requestError: unknown) => {
        if (isMounted) {
          setError(requestError instanceof Error
            ? requestError.message
            : 'No se pudieron cargar las noticias.');
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    blogService.getPublishedPost(slug)
      .then((post) => {
        if (isMounted) setPostResult({ slug, post, error: null });
      })
      .catch((requestError: unknown) => {
        if (isMounted) {
          setPostResult({
            slug,
            post: null,
            error: requestError instanceof Error
              ? requestError.message
              : 'No se pudo cargar esta noticia.',
          });
        }
      })

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const visiblePosts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('es');

    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
      const matchesSearch = !normalizedSearch ||
        `${post.title} ${post.excerpt} ${post.content}`.toLocaleLowerCase('es').includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, search]);
  const selectedPost = postResult && postResult.slug === slug ? postResult.post : null;
  const isPostLoading = Boolean(slug && (!postResult || postResult.slug !== slug));

  return (
    <main className="grow bg-[#FAFBFD]">
      <section className="bg-[#0B192C] px-4 py-14 text-center text-white sm:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-300">Aura Corporativa</p>
        <h1 className="mx-auto mt-3 max-w-4xl text-3xl font-black sm:text-4xl">
          Blog de Contabilidad y Finanzas
        </h1>
        <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#DC2626]" />
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
          Noticias, normativas de SUNAT, SUNAFIL y estrategias financieras para empresas.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {slug ? (
          <article className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-[#DC2626] hover:underline">
              <ArrowLeft size={16} aria-hidden="true" /> Volver al blog
            </Link>
            {isPostLoading ? (
              <p className="py-16 text-center text-slate-600" role="status">Cargando noticia...</p>
            ) : selectedPost ? (
              <>
                {(selectedPost.image_url || selectedPost.image) && (
                  <img
                    src={selectedPost.image_url || blogService.getImageUrl(selectedPost.image)}
                    alt=""
                    className="mt-6 max-h-[28rem] w-full rounded-lg object-cover"
                  />
                )}
                <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="rounded bg-red-50 px-3 py-1 font-bold uppercase tracking-wide text-[#DC2626]">
                    {selectedPost.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={15} aria-hidden="true" />
                    {selectedPost.date || formatDate(selectedPost.published_at)}
                  </span>
                  {selectedPost.link && (
                    <a
                      href={selectedPost.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1 font-bold text-xs text-blue-700 hover:bg-blue-100 transition"
                    >
                      <ExternalLink size={13} /> Fuente Original
                    </a>
                  )}
                </div>
                <h2 className="mt-4 text-3xl font-black leading-tight text-[#0B192C] sm:text-4xl">
                  {selectedPost.title}
                </h2>
                <p className="mt-5 border-l-4 border-[#DC2626] pl-4 text-lg leading-8 text-slate-600">
                  {selectedPost.desc || selectedPost.excerpt}
                </p>
                {selectedPost.content && selectedPost.content !== selectedPost.desc && (
                  <div className="mt-7 whitespace-pre-line text-base leading-8 text-slate-700">
                    {selectedPost.content}
                  </div>
                )}
                {selectedPost.link && (
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <a
                      href={selectedPost.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#DC2626] hover:bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition shadow-sm"
                    >
                      <span>Leer noticia completa en el portal original</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </>
            ) : (
              <p className="py-16 text-center text-slate-600" role="alert">
                {postResult && postResult.slug === slug && postResult.error
                  ? postResult.error
                  : 'No se encontró la noticia solicitada.'}
              </p>
            )}
          </article>
        ) : (
          <>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap justify-center gap-2" aria-label="Filtrar por categoría">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                    className={`border px-4 py-2.5 text-sm font-semibold transition-colors ${
                      activeCategory === category
                        ? 'border-[#0B192C] bg-[#0B192C] text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-[#0B192C] hover:text-[#0B192C]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <label className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-400 shadow-sm focus-within:border-[#0B192C]">
                <Search size={18} aria-hidden="true" />
                <span className="sr-only">Buscar noticias</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar noticias por título o contenido..."
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </label>
            </div>

            {isLoading ? (
              <p className="py-20 text-center text-slate-600" role="status">Cargando noticias...</p>
            ) : error ? (
              <p className="mx-auto mt-10 max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : visiblePosts.length > 0 ? (
              <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => <BlogPostCard key={post.id} post={post} />)}
              </div>
            ) : (
              <p className="mt-10 rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
                {posts.length === 0
                  ? 'Pronto publicaremos nuevas noticias y artículos.'
                  : 'No encontramos noticias que coincidan con tu búsqueda.'}
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
