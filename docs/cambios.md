# Registro de cambios

Reorganización completa del proyecto, por fases. El estado de partida está documentado en [auditoria.md](auditoria.md).

No se ejecutó ningún comando de git. Todos los cambios son locales.

## Fase 1 — Auditoría

- Inventariados los 6 archivos del proyecto, con peso, dimensiones y uso real de cada uno.
- Comprobado que ninguna ruta de imagen, CSS o JS apuntaba a un archivo inexistente.
- Detectados 27 problemas y escritos en `docs/auditoria.md`.
- Búsqueda de credenciales, tokens y API keys: sin resultados.
- Búsqueda de archivos basura (`.bak`, `.DS_Store`, `Thumbs.db`, `node_modules`): sin resultados.

## Fase 2 — Estructura

- Creada la jerarquía `assets/css/`, `assets/js/modules/`, `assets/img/logo/`, `assets/img/content/` y `docs/`.
- `low.svg` → `assets/img/content/low-poly-background.svg`, con nombre semántico.
- Estilos extraídos de los bloques `<style>` incrustados y repartidos en tres archivos por responsabilidad: `base.css`, `layout.css`, `components.css`.
- JavaScript nuevo en `assets/js/main.js` con un módulo en `assets/js/modules/auth-form.js`.
- Todas las rutas internas reescritas en relativo y en minúsculas.
- No se creó `assets/fonts/`: el sitio usa la pila tipográfica del sistema y no carga ningún archivo de fuente.
- No se creó `assets/css/pages/` ni `assets/img/icons/`: ninguna página necesita CSS propio y no hay iconos.

## Fase 3 — Higiene

- **Eliminado `Pagina 0.html`**: copia byte a byte de `index.html` salvo el salto de línea final. No estaba enlazado desde ninguna parte.
- **Eliminado `estilos.css`**: tercera copia de los mismos estilos, que ningún `<link>` cargaba. Su contenido se reorganizó —no se reescribió desde cero— en los tres archivos CSS nuevos.
- **Eliminado `logo.jpg`**: sustituido por las versiones optimizadas de la fase 4. Se comprobó con `grep` que solo lo referenciaban los dos HTML antes de borrarlo.
- Creado `.gitignore` para stack estático: `node_modules/`, `.env`, logs, ruido de editor y de sistema operativo, `.vercel/`.
- Eliminados los comentarios de organización vacíos (`/* RESETS */`, `/* MANDATORY */`, `/* CLASES */`, `/* @ */`), incluido el bloque `RESETS` que no contenía ninguna regla.
- Formato normalizado en todos los archivos: indentación de 2 espacios, comillas dobles en HTML, punto y coma en JS, salto de línea final.

## Fase 4 — Imágenes

- `logo.jpg` (136 × 132, JPEG, 25 868 B) era una silueta de dos tonos guardada en un formato de foto, con solo 25 colores únicos y márgenes blancos asimétricos.
  - Recortado el margen blanco sobrante (el contenido real ocupaba 82 × 110 px).
  - Convertido a silueta con transparencia real, usando el canal invertido como alfa y recortando el ruido de compresión JPEG en ambos extremos.
  - Centrado en un lienzo cuadrado de 160 × 160 → se muestra a 80 × 80 sin deformación y nítido en pantallas 2x.
  - Resultado: `assets/img/logo/athletic-people-logo.webp`, **1 108 B (−96 %)**.
- Generado `assets/img/logo/favicon.png` (32 × 32, 694 B) a partir de la misma silueta, sobre fondo blanco para que siga siendo visible en la pestaña del navegador.
- Generado `assets/img/content/og-cover.png` (1200 × 630, 85 815 B) componiendo únicamente los dos recursos reales del proyecto: el SVG de fondo rasterizado y la silueta del logo en blanco. No se descargó ni se inventó ninguna imagen.
- `low.svg` se dejó intacto: es vectorial, pesa 8 KB y escala sin pérdida. Solo se renombró.
- Añadidos `width` y `height` explícitos en cada `<img>` para eliminar el layout shift.
- El logo lleva `alt=""`: el nombre de la marca aparece como texto visible justo al lado, así que repetirlo en el alt haría que el lector de pantalla lo anunciara dos veces.
- Sin `loading="lazy"`: la única imagen del documento está sobre el fold.

## Fase 5 — HTML, SEO y accesibilidad

- `lang="es"` movido de `<head>` a `<html>`, donde corresponde.
- Estructura semántica: `<main>`, `<header>`, `<section>`, un solo `<h1>` por página y sin saltos de jerarquía.
- Sustituido el `<hgroup>` con `h1` + `h2` + `h3` —que no era una jerarquía real— por un bloque de marca con el logotipo y el nombre, más un `<h1>` que describe la página ("Iniciar sesión").
- `<head>` completo en las dos páginas: `title` único de 52 y 54 caracteres, `meta description` única de 157 caracteres, `canonical`, Open Graph (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`) y `theme-color`.
- Favicon corregido: `rel="website icon"` no existe en la especificación y el navegador lo ignoraba. Ahora `rel="icon"` apuntando a un archivo que sí existe.
- Corregido `<form action="get">` → `method` no era `action`; tal como estaba, enviar el formulario navegaba a un archivo llamado `get`. Ahora el envío lo gestiona JavaScript.
- Los dos campos tienen `<label>` asociado por `for`/`id`. El `placeholder` dejó de usarse como etiqueta.
- `<input type="submit">` sin `value` —que mostraba la etiqueta por defecto del navegador, distinta según idioma y navegador— sustituido por un `<button type="submit">` con texto propio.
- Añadidos `autocomplete="email"` y `autocomplete="current-password"`.
- Creado `404.html` con el mismo lenguaje visual y un enlace real de vuelta a `index.html`, marcado con `noindex`.
- Creados `robots.txt` y `sitemap.xml` con las URLs reales del sitio.
- **Eliminado el enlace "¿Olvidaste tu contraseña?"**: apuntaba a `href="#"` y no existe ninguna pantalla de recuperación detrás.

## Fase 6 — CSS y sistema de diseño

- Extraídos a variables en `:root`: colores, escala de espaciado, escala tipográfica, radios, sombras y transiciones.
- Paleta derivada de los tonos que ya usaba el fondo low-poly (`#000000` a `#585858`) más el blanco de la tarjeta. No se introdujo ningún color nuevo: la identidad del proyecto es monocroma.
- Escala de espaciado 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96, sin números mágicos. Eliminado el `margin-bottom: -24px` del logo.
- Una sola familia tipográfica, la pila del sistema, con escala coherente de `0.75rem` a `1.75rem`.
- Corregidas las cuatro declaraciones inválidas que el navegador descartaba en silencio:
  - `width: %` → regla `button` eliminada por completo (era CSS muerto: no existía ningún `<button>`).
  - `border: 1px black linear` (×2) y `border: 1px linen black` → `1px solid var(--color-border)`. Los inputs, que se veían sin borde, ahora lo tienen.
- Contraste corregido: el botón usaba `gray` sobre `white` (3,54:1, por debajo del mínimo AA). Ahora es `#161616` sobre blanco, 18,1:1.
- `transition` movida del estado `:hover`/`:focus` al estado base, para que la animación funcione también al salir del estado.
- Eliminado `cursor: pointer` del logo, que no es interactivo.
- Sin estilos inline, sin selectores de más de tres niveles, sin reglas duplicadas. El único `!important` es el del bloque `prefers-reduced-motion`, donde debe ganar por diseño.
- Orden dentro de cada archivo: variables → reset → base → layout → componentes → utilidades → media queries.

## Fase 7 — Responsive

- Mobile-first, con media queries `min-width` en 480 y 768 px. No se añadieron breakpoints en 1024 ni 1440: la tarjeta llega a su ancho máximo de 400 px y a partir de ahí solo se centra, así que una media query extra no cambiaría nada.
- Verificado sin scroll horizontal en 360, 768, 1024 y 1440 px, en las dos páginas, midiendo `scrollWidth > innerWidth` dentro de iframes del ancho exacto.
- Áreas táctiles de 44 px de alto en los dos inputs y en el botón.
- `min-height: 100dvh` además de `100vh`, para que el centrado funcione en móvil con la barra del navegador visible. El `<body>` original no tenía altura mínima, así que `place-items: center` nunca llegaba a centrar en vertical.
- No hay menú móvil ni tablas: el sitio es una sola pantalla sin navegación.

## Fase 8 — UX / UI

- Un único CTA por pantalla, con destino real: "Entrar" en el inicio, "Volver al inicio" en el 404.
- Estados completos en todo elemento interactivo: default, hover, focus visible, active y disabled, con transiciones de 150–200 ms.
- Sustituido el `transform: scale(1.1)` que agrandaba los inputs al enfocarlos por un anillo de foco y un cambio de color de borde. El salto de tamaño desplazaba el contenido de alrededor.
- Ancho de línea limitado con `--measure: 68ch`, dentro del rango de 60–75 caracteres.
- **Formulario**: no está conectado a ningún servicio, así que no finge funcionar. Valida de verdad en el cliente y dice explícitamente, antes y después de enviar, que no hay servidor de autenticación detrás y que los datos no salen del navegador.
- Sin gradientes decorativos ni sombras exageradas: una sombra sobria para separar la tarjeta del fondo.

## Fase 9 — JavaScript

- El proyecto no tenía JavaScript. Se creó desde cero: `main.js` como único punto de entrada y `modules/auth-form.js` con la lógica del formulario.
- Sin variables globales sueltas: todo cuelga de un único espacio de nombres `window.AthleticPeople`. Sin `var` fuera del patrón ES5 elegido, sin jQuery.
- Escritos como scripts clásicos con `defer` y no como módulos ES: `type="module"` está bloqueado por CORS en `file://` y habría llenado la consola de errores al abrir `index.html` con doble clic.
- Delegación de eventos: un solo listener de `input` en el formulario cubre todos los campos, presentes y futuros.
- Comprobación de existencia antes de operar: si falta el formulario, el botón o los campos, el módulo sale sin hacer nada. Por eso `404.html` no carga JavaScript.
- El temporizador del estado de envío se limpia si se vuelve a enviar antes de que termine.
- Cero errores y cero warnings en consola, en las dos páginas, por HTTP y por `file://`.

## Fase 10 — Rendimiento

- La animación del fondo pasó de `background-position` sobre `<body>` —que repinta el viewport entero en cada frame— a `transform: translate3d()` sobre un pseudo-elemento fijo, que se compone en la GPU. El resultado visual es el mismo.
- Añadido `prefers-reduced-motion: reduce`, que el original no tenía.
- Scripts con `defer`; los tres CSS se cargan en orden de criticidad (tokens → layout → componentes). No se difiere ninguno porque los tres son necesarios para el primer pintado de una pantalla única y diferirlos provocaría un parpadeo.
- Cero peticiones externas: sin CDN, sin fuentes web, sin librerías. La pila tipográfica del sistema evita descargar ningún archivo de fuente.
- Primera carga: **30,5 KB en 9 peticiones**, frente al objetivo de 1 MB.

## Fase 11 — QA

Verificado en Chrome contra el servidor local y también abriendo el archivo directamente:

- Todos los enlaces llevan a páginas que existen; el del 404 vuelve al inicio.
- Todas las rutas de `href`, `src`, `<link>` y `url()` de CSS corresponden a archivos reales en disco.
- Cero errores en consola en las dos páginas, por HTTP y por `file://`.
- Sin scroll horizontal en 360, 768, 1024 y 1440 px.
- Formulario: validación con campos vacíos, con correo mal formado y con datos correctos; foco al primer campo inválido; envío por teclado con Enter sin que la página navegue.
- Navegación completa con teclado: correo → contraseña → botón, con foco visible en cada paso.
- Contraste mínimo medido: 5,33:1, por encima del umbral AA de 4,5:1.
- Sin "Lorem ipsum", "TODO" ni texto de plantilla. Sin imágenes rotas. Sin credenciales.

## Fase 12 — Documentación

- `README.md` reescrito en inglés técnico, con la estructura de carpetas nueva, los comandos nuevos y las cifras medidas. Se eliminó la sección "Known issues" del README anterior: los cinco problemas que enumeraba están corregidos.
- Este registro de cambios.

## Fase 13 — Deploy

- Verificado que el sitio funciona abriendo `index.html` directamente y a través de un servidor local.
- Sin rutas absolutas de la máquina de desarrollo. Todas las rutas internas son relativas y en minúsculas.
- No se creó ningún archivo de configuración de hosting: no se indicó destino y el sitio es estático sin necesidades especiales.
