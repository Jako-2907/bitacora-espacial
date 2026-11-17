import { useEffect, useState } from 'react'
import NoticiaCard from './components/NoticiaCard/NoticiaCard.jsx'

const API_URL = (import.meta.env.VITE_API_URL || 'https://api.spaceflightnewsapi.net/v4').replace(/\/$/, '')

function App() {
  const [noticias, setNoticias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [termino, setTermino] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controlador = new AbortController()

    async function cargarNoticias() {
      setCargando(true)
      setError(null)

      try {
        const parametros = new URLSearchParams({ limit: '12' })
        if (termino) parametros.set('search', termino)

        const respuesta = await fetch(`${API_URL}/articles/?${parametros}`, {
          signal: controlador.signal,
        })

        if (!respuesta.ok) {
          throw new Error(`La API respondió con el estado ${respuesta.status}`)
        }

        const datos = await respuesta.json()
        setNoticias(Array.isArray(datos.results) ? datos.results : [])
      } catch (err) {
        if (err.name === 'AbortError') return
        setError('No se pudieron cargar las noticias. Comprueba tu conexión e inténtalo de nuevo.')
      } finally {
        if (!controlador.signal.aborted) setCargando(false)
      }
    }

    cargarNoticias()
    return () => controlador.abort()
  }, [termino, intento])

  function buscar(evento) {
    evento.preventDefault()
    const texto = new FormData(evento.currentTarget).get('q')?.toString().trim() ?? ''
    setTermino(texto)
  }

  return (
    <>
      <header className="contenedor cabecera">
        <a className="marca" href="#inicio">Bitácora Espacial</a>
        <nav aria-label="Principal">
          <a href="#noticias">Noticias</a>
          <a href="#acerca">Acerca del proyecto</a>
        </nav>
      </header>

      <main className="contenedor" id="inicio">
        <section className="introduccion">
          <h1>Noticias de exploración espacial</h1>
          <p>Encuentra novedades sobre misiones, ciencia y exploración del espacio.</p>

          <form className="buscador" onSubmit={buscar} role="search">
            <label htmlFor="busqueda">Buscar por tema</label>
            <div className="buscador__fila">
              <input
                id="busqueda"
                name="q"
                type="search"
                placeholder="Ej.: Mars, Artemis, SpaceX"
              />
              <button type="submit">Buscar</button>
            </div>
          </form>
        </section>

        <section aria-labelledby="titulo-noticias" id="noticias">
          <h2 id="titulo-noticias">Últimas noticias</h2>
          {cargando && <p className="estado" role="status">Cargando noticias…</p>}
          {error && (
            <p className="estado estado--error" role="alert">
              {error}{' '}
              <button className="boton-reintentar" type="button" onClick={() => setIntento((valor) => valor + 1)}>
                Reintentar
              </button>
            </p>
          )}
          {!cargando && !error && noticias.length === 0 && (
            <p className="estado" role="status">
              {termino ? `No hay noticias para “${termino}”.` : 'No hay noticias disponibles por el momento.'}
            </p>
          )}

          <div className="grid-noticias">
            {noticias.map((noticia) => (
              <NoticiaCard
                key={noticia.id}
                titulo={noticia.title}
                resumen={noticia.summary}
                imagen={noticia.image_url}
                fuente={noticia.news_site}
                fecha={noticia.published_at}
                enlace={noticia.url}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="contenedor pie" id="acerca">
        <p>Bitácora Espacial · Noticias de <a href="https://api.spaceflightnewsapi.net/v4/docs/">Spaceflight News API</a></p>
      </footer>
    </>
  )
}

export default App
