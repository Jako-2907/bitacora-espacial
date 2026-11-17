import './NoticiaCard.css'

const formatoFecha = new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' })

function NoticiaCard({ titulo, resumen, imagen, fuente, fecha, enlace, prioridadImagen = false }) {
  const fechaValida = fecha && !Number.isNaN(new Date(fecha).getTime())
  const fechaFormateada = fechaValida ? formatoFecha.format(new Date(fecha)) : ''

  return (
    <article className="noticia-card">
      {imagen && <img
        className="noticia-card__imagen"
        src={imagen}
        alt=""
        loading={prioridadImagen ? 'eager' : 'lazy'}
        fetchPriority={prioridadImagen ? 'high' : 'auto'}
        decoding="async"
      />}
      <h3 className="noticia-card__titulo">{titulo}</h3>
      <p className="noticia-card__resumen">{resumen}</p>
      <p className="noticia-card__meta">
        {fuente}{fuente && fechaFormateada ? ' · ' : ''}{fechaValida && <time dateTime={fecha}>{fechaFormateada}</time>}
      </p>
      <a
        className="noticia-card__enlace"
        href={enlace}
        target="_blank"
        rel="noopener noreferrer"
      >
        Leer noticia
      </a>
    </article>
  )
}

export default NoticiaCard
