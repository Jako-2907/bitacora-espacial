# Bitácora Espacial

Bitácora Espacial es una pequeña portada para descubrir noticias recientes sobre exploración espacial. Consulta artículos de Spaceflight News API y permite filtrarlos por tema.

## Qué incluye

- Búsqueda de artículos por palabra o tema.
- Tarjetas con título, resumen, fuente, fecha e imagen cuando la API la proporciona.
- Estados de carga, error y búsqueda sin resultados.
- Diseño adaptable construido con CSS, variables de diseño y componentes reutilizables en React.

## Requisitos

- Node.js y npm.
- Acceso a internet para consultar Spaceflight News API.

## Instalación y desarrollo

Instala las dependencias:

```sh
npm install
```

La aplicación usa Spaceflight News API directamente. Si necesitas cambiar la URL, crea un archivo `.env` con esta variable (la URL ya está en `.env.example`):

```env
VITE_API_URL=https://api.spaceflightnewsapi.net/v4
```

Inicia el servidor local:

```sh
npm run dev
```

Vite mostrará la dirección local en la terminal (normalmente `http://localhost:5173`).

## Otros comandos

- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve localmente la compilación para revisarla.
- `npm run lint`: revisa el código con Oxlint.

## Datos

Los artículos se obtienen de [Spaceflight News API](https://api.spaceflightnewsapi.net/v4/docs/). La aplicación solicita hasta 12 resultados por búsqueda. La disponibilidad de noticias, imágenes y resúmenes depende de ese servicio externo.
