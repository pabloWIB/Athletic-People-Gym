# Auditoría del proyecto — Athletic People Gym

Estado inicial registrado antes de tocar ningún archivo. Documento de trabajo interno.

## 1. Inventario de archivos

Seis archivos en la raíz, sin subcarpetas. No hay `node_modules`, ni build, ni gestor de paquetes.

| Archivo | Tipo | Peso | ¿Se carga? | Propósito real |
|---|---|---|---|---|
| `index.html` | HTML | 2 438 B | Sí — punto de entrada | Pantalla de inicio de sesión. `<title>Athletic People`, `<h1>GYM` |
| `Pagina 0.html` | HTML | 2 436 B | No — nadie enlaza a él | Copia byte a byte de `index.html` (solo cambia el salto de línea final). Mismo `<title>` y mismo `<h1>` |
| `estilos.css` | CSS | 1 840 B | **No — huérfano** | Copia literal del bloque `<style>` incrustado en los HTML. Ningún `<link>` lo referencia |
| `logo.jpg` | Imagen | 25 868 B | Sí — `<img>` y favicon | Silueta de una persona levantando una barra |
| `low.svg` | Imagen | 8 165 B | Sí — `background-image` | Fondo geométrico low-poly en escala de grises |
| `README.md` | Markdown | 4 014 B | — | Documentación del repositorio |

### Detalle de imágenes

| Archivo | Formato | Dimensiones | Tamaño mostrado | Peso | Observación |
|---|---|---|---|---|---|
| `logo.jpg` | JPEG | 136 × 132 px | 80 × 80 px CSS | 25 868 B | Solo 25 colores únicos: es una silueta de dos tonos guardada como JPEG. El contenido real ocupa 82 × 110 px; el resto es margen blanco. Formato equivocado para este contenido |
| `low.svg` | SVG | viewBox 900 × 600 | `cover` a pantalla completa | 8 165 B | Correcto. Vectorial, escala sin pérdida, peso adecuado |

### Dependencias externas

Ninguna. Sin CDNs, sin fuentes remotas, sin librerías, sin peticiones de red a terceros. El sitio funciona completamente offline.

### Archivos basura

No se encontró ninguno: sin `.bak`, sin `.DS_Store`, sin `Thumbs.db`, sin `*.log`, sin `node_modules`, sin archivos con sufijos de versión.

## 2. Problemas detectados

### 2.1 Enlaces, rutas y referencias

| # | Problema | Ubicación | Gravedad |
|---|---|---|---|
| 1 | `<a href="#">¿Olvidaste tu contraseña?</a>` no lleva a ningún sitio. No existe pantalla de recuperación | `index.html:110` | Alta |
| 2 | `estilos.css` no está referenciado por ningún `<link>`. Editarlo no cambia nada en pantalla | Raíz | Alta |
| 3 | `Pagina 0.html` no está enlazado desde ninguna página; es inalcanzable navegando | Raíz | Media |
| 4 | El nombre `Pagina 0.html` contiene un espacio, que se convierte en `%20` en toda URL | Raíz | Media |
| 5 | No existe `404.html` | — | Media |

Ninguna ruta de imagen, CSS o JS apunta a un archivo inexistente: `logo.jpg` y `low.svg` existen ambos en disco. No hay imágenes rotas.

### 2.2 HTML inválido o incorrecto

| # | Problema | Ubicación | Efecto real |
|---|---|---|---|
| 6 | `<head lang="es">` — el atributo `lang` está en `<head>`; `<html>` no lo tiene | `index.html:2-3` | El navegador y los lectores de pantalla no saben el idioma del documento |
| 7 | `<form action="get">` — `action` recibe un método HTTP | `index.html:106` | Al enviar, el formulario navega a un archivo llamado `get`, que no existe |
| 8 | `<link rel="website icon">` — valor de `rel` inexistente en la especificación | `index.html:7` | Se ignora; el navegador pide `/favicon.ico` y recibe 404 |
| 9 | `<img src="logo.jpg">` sin `alt`, sin `width`, sin `height` | `index.html:100` | Inaccesible para lectores de pantalla + layout shift al cargar |
| 10 | `<input type="submit">` sin atributo `value` | `index.html:109` | El botón muestra la etiqueta por defecto del navegador, que cambia según navegador e idioma del sistema |
| 11 | Los tres `<input>` no tienen `<label>` asociado; se usa `placeholder` como etiqueta | `index.html:107-109` | Falla de accesibilidad: el nombre del campo desaparece al escribir |
| 12 | `<hgroup>` con `h1` + `h2` + `h3` | `index.html:101-105` | `hgroup` admite un encabezado y párrafos, no tres encabezados. "GYM", "Athletic People" e "Iniciar Sesión" no son una jerarquía de secciones |
| 13 | Sin `<main>`, `<header>`, `<footer>` ni ningún landmark | `index.html:98-113` | Navegación por regiones imposible con lector de pantalla |
| 14 | Sin `<meta name="description">`, sin Open Graph, sin `<link rel="canonical">` | `index.html:3-7` | Sin control sobre cómo aparece el sitio en buscadores o al compartirlo |
| 15 | `<title>` idéntico en las dos páginas | Ambos HTML | Títulos no únicos |

### 2.3 CSS inválido o muerto

| # | Regla | Ubicación | Efecto real |
|---|---|---|---|
| 16 | `width: %` | `estilos.css:26` y bloque inline | Valor inválido. El navegador descarta la declaración entera |
| 17 | `border: 1px black linear` (dos veces) | `estilos.css:65,88` | `linear` no es un `border-style`. La declaración se descarta: los inputs se quedan **sin borde** |
| 18 | `border: 1px linen black` | `estilos.css:83` | Inválida por el mismo motivo, y además sobrescrita cinco líneas más abajo |
| 19 | `background-color: gray` con `color: white` | `estilos.css:27-28` | Contraste 3,54:1 — por debajo del mínimo WCAG AA de 4,5:1 |
| 20 | Regla `button { … }` completa | `estilos.css:23-31` | **CSS muerto**: no existe ningún elemento `<button>` en el proyecto |
| 21 | `transition` declarada dentro de `:focus` y `:hover`, no en el estado base | `estilos.css:70-79,102-106` | La animación ocurre al entrar pero no al salir del estado |
| 22 | `img { cursor: pointer }` | `estilos.css:34` | El logo no es interactivo pero el cursor sugiere que sí |
| 23 | `margin-bottom: -24px` | `estilos.css:37` | Número mágico para compensar un espaciado que no está resuelto |
| 24 | `animation: moves` sobre `background-position` | `estilos.css:20,113-115` | Repinta el fondo a pantalla completa en cada frame durante toda la sesión. Sin guarda `prefers-reduced-motion` |
| 25 | `body` sin `min-height` | `estilos.css:14-21` | `place-items: center` no centra verticalmente: el `<body>` mide lo mismo que la tarjeta |

### 2.4 Duplicación

| # | Qué está duplicado | Alcance |
|---|---|---|
| 26 | `Pagina 0.html` frente a `index.html` | Archivo completo, idéntico salvo el salto de línea final. Un cambio en uno no llega al otro |
| 27 | Bloque `<style>` inline frente a `estilos.css` | 59 declaraciones repetidas en tres sitios (dos HTML + el CSS huérfano) |

### 2.5 Contenido de relleno

No hay texto de plantilla: ni "Lorem ipsum", ni "TODO", ni secciones heredadas de un tema. Todo el texto visible es propio del proyecto y está en español. Los comentarios `/* RESETS */`, `/* MANDATORY */`, `/* CLASES */` y `/* @ */` de `estilos.css` son marcadores de organización sin contenido, y la sección `/* RESETS */` está vacía.

### 2.6 Credenciales

Búsqueda de patrones de API keys, tokens, secretos y claves privadas: **sin resultados**. No hay credenciales en el código.

## 3. Resumen en cinco líneas

1. Es la pantalla de inicio de sesión de un gimnasio llamado Athletic People: una tarjeta blanca centrada sobre un fondo low-poly oscuro que se desplaza lentamente. Es todo el proyecto; no hay segunda pantalla real.
2. Está en estado de ejercicio de aprendizaje: funciona visualmente, pero el HTML y el CSS tienen errores de sintaxis que el navegador descarta en silencio, y la organización no existe (todo en la raíz, estilos incrustados y duplicados).
3. Lo más grave es la duplicación en tres frentes: `Pagina 0.html` es una copia byte a byte de `index.html`, y `estilos.css` es una tercera copia de los mismos estilos que ninguna página carga. Cualquier cambio hay que hacerlo tres veces o el sitio se desincroniza.
4. Le sigue el formulario: `action="get"` en lugar de `method="get"` hace que al enviar navegue a un archivo inexistente, los campos no tienen `<label>` y no hay ninguna validación.
5. Cuatro declaraciones CSS son inválidas y se descartan sin aviso — entre ellas los bordes de los dos inputs, que por eso se ven sin borde, y el color del botón no alcanza el contraste mínimo de accesibilidad.
