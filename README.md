# 🧪 WebdriverIO + Cucumber + TypeScript POC

&gt; **Prueba de Concepto** de automatización de pruebas con WebDriverIO, Cucumber (Gherkin), TypeScript y Allure.

---

## 📋 Índice

- [Descripción general](#-descripción-general)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecutar los tests](#-ejecutar-los-tests)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Tests disponibles](#-tests-disponibles)
- [Reportes (Allure)](#-reportes-allure)
- [Integración continua (GitHub Actions)](#-integración-continua-github-actions)
- [Solución de problemas](#-solución-de-problemas)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Autor y licencia](#-autor-y-licencia)

---

## 📖 Descripción general

Este proyecto es una **Prueba de Concepto (POC)** que demuestra cómo automatizar pruebas end‑to‑end utilizando:

- **WebDriverIO** (v9) – Framework de automatización de navegadores.
- **Cucumber (Gherkin)** – Pruebas en lenguaje natural (BDD).
- **TypeScript** – Tipado estático para un código más robusto y mantenible.
- **Allure Reporter** – Reportes visuales profesionales con gráficos y capturas.

Las pruebas se ejecutan sobre la web de demostración [**The Internet**](https://the-internet.herokuapp.com) y el proyecto está preparado con **integración continua** mediante **GitHub Actions**, con publicación automática del reporte en **GitHub Pages**.

---

## ✅ Requisitos previos

Asegúrate de tener instalado en tu máquina:

- [Node.js](https://nodejs.org/) (versión **20.x** o superior)
- [Git](https://git-scm.com/)
- [Google Chrome](https://www.google.com/chrome/) (versión estable)

---

## 📦 Instalación

Sigue estos pasos para tener el proyecto en tu entorno local:

```bash
# Clonar el repositorio
git clone https://github.com/alvaroarchilla/WebdriverIO_Gherkin_POC.git
cd WebdriverIO_Gherkin_POC

# Instalar dependencias
npm install

# Si encuentras conflictos de peer dependencies (ej. wdio-chromedriver-service), usa:
npm install --legacy-peer-deps
```

Verifica que todo funciona correctamente:

```bash
npm run test:dropdown
```

Deberías ver cómo se abre un navegador Chrome y se ejecutan los tests.

---

## ▶️ Ejecutar los tests

El proyecto incluye varios scripts npm para ejecutar los tests de forma flexible:

| Comando | Descripción |
|---------|-------------|
| `npm run test` | Ejecuta todos los features. |
| `npm run test:login` | Ejecuta solo el feature de Login. |
| `npm run test:dropdown` | Ejecuta solo el feature de Dropdown. |
| `npm run test:checkboxes` | Ejecuta solo el feature de Checkboxes. |

### Opciones adicionales

**Filtrar por tags** (si añades `@tag` en los features):

```bash
npx wdio run wdio.conf.ts --cucumberOpts.tagExpression '@login'
```

**Ejecutar en modo headless** (sin interfaz gráfica):

```bash
HEADLESS=true npm run test
```

**Ver logs detallados:**

```bash
npx wdio run wdio.conf.ts --logLevel=debug
```

---

## 📁 Estructura del proyecto

```
WebdriverIO_Gherkin_POC/
├── .github/
│   └── workflows/
│       └── test.yml              # Configuración de CI/CD
├── src/
│   ├── features/                  # Archivos .feature (Gherkin)
│   │   ├── login.feature
│   │   ├── dropdown.feature
│   │   └── checkboxes.feature
│   ├── step-definitions/          # Implementación de los pasos (TS)
│   │   ├── login.steps.ts
│   │   ├── dropdown.steps.ts
│   │   └── checkboxes.steps.ts
│   ├── page-objects/              # Patrón Page Object
│   │   ├── login.page.ts
│   │   ├── dropdown.page.ts
│   │   └── checkboxes.page.ts
│   └── hooks/                     # Hooks globales (Before/After)
│       └── hooks.ts
├── allure-results/                # Resultados crudos de Allure (generado)
├── allure-report/                 # Reporte HTML (generado)
├── wdio.conf.ts                   # Configuración principal de WDIO
├── tsconfig.json                  # Configuración de TypeScript
├── package.json                   # Dependencias y scripts
└── README.md                      # Este archivo
```

---

## 🧪 Tests disponibles

| Feature | Descripción | URL de prueba |
|---------|-------------|---------------|
| Login | Prueba inicio de sesión con credenciales válidas e inválidas. | `/login` |
| Dropdown | Selección de opciones en un menú desplegable. | `/dropdown` |
| Checkboxes | Marcar y desmarcar casillas de verificación. | `/checkboxes` |

Todos los tests utilizan la página **The Internet** como entorno de demostración.

---

## 📊 Reportes (Allure)

### Generar el reporte localmente

Una vez ejecutados los tests, puedes generar y abrir el reporte Allure:

```bash
npm run report
```

Esto creará la carpeta `allure-report/` y abrirá el `index.html` en tu navegador predeterminado.

&gt; **Nota:** Asegúrate de tener el script `report` en tu `package.json`:
&gt; ```json
&gt; "report": "allure generate allure-results --clean --single-file -o allure-report && allure open"
&gt; ```

### Ver el reporte en GitHub Actions

1. Ve a la pestaña **Actions** del repositorio.
2. Selecciona una ejecución del workflow.
3. En la sección **Artifacts**, descarga el ZIP llamado `allure-report`.
4. Descomprime el archivo y abre `index.html` en tu navegador.

### Ver el reporte online (GitHub Pages)

El reporte se despliega automáticamente en:

🔗 [https://alvaroarchilla.github.io/WebdriverIO_Gherkin_POC/](https://alvaroarchilla.github.io/WebdriverIO_Gherkin_POC/)

*(Solo disponible después de una ejecución exitosa del workflow en la rama `main`)*

---

## 🤖 Integración continua (GitHub Actions)

El proyecto está configurado con GitHub Actions para ejecutar los tests automáticamente en cada push o pull request a la rama `main`.

### Flujo del workflow (`.github/workflows/test.yml`)

1. Checkout del código.
2. Setup Node.js (versión 20).
3. Instalación de dependencias (`npm ci --legacy-peer-deps`).
4. Ejecución de todos los tests.
5. Generación del reporte Allure.
6. Subida de artefactos (reporte HTML y resultados crudos).
7. Despliegue a GitHub Pages (solo cuando se ejecuta en `main`).

### Ver el estado del CI

- Ve a la pestaña **Actions** del repositorio.
- Allí verás todas las ejecuciones del workflow, con su estado (✅ éxito / ❌ fallo) y sus logs.

### Configuración de GitHub Pages

Para que el reporte se publique correctamente:

- En **Settings → Pages**, la fuente está configurada como `gh-pages branch` y `/` (root).
- El workflow tiene permisos de escritura (`contents: write`).
- Jekyll está desactivado (`enable_jekyll: false`) para que no intente procesar los HTML estáticos.

---

## 🔧 Solución de problemas comunes

| Problema | Posible solución |
|----------|------------------|
| **Step is not defined** | Asegúrate de que los textos en los archivos `.feature` coinciden exactamente con los de los `.steps.ts`. Verifica la ruta en `cucumberOpts.require` de `wdio.conf.ts`. |
| **Error con wdio-chromedriver-service** | Ejecuta `npm install --legacy-peer-deps` o elimina esa dependencia del `package.json`. No es necesaria en WDIO v9. |
| **Los tests fallan por selectores** | Revisa los selectores en los Page Objects (`src/page-objects/`). Usa las DevTools del navegador para inspeccionar los elementos reales. |
| **No se genera el reporte Allure** | Verifica que la carpeta `allure-results/` exista después de ejecutar los tests. Si no, comprueba que el reporter está correctamente configurado en `wdio.conf.ts`. |
| **GitHub Pages no muestra el reporte** | Confirma que en **Settings → Pages** la fuente sea `gh-pages branch` y `/` (root). También revisa que el paso de despliegue del workflow haya sido exitoso. |

---

## 🛠️ Tecnologías utilizadas

- **WebDriverIO** – Automatización de navegadores.
- **Cucumber** – BDD con Gherkin.
- **TypeScript** – Tipado estático.
- **Allure** – Reportes de pruebas.
- **GitHub Actions** – CI/CD.
- **GitHub Pages** – Hosting del reporte.

---

## 👤 Autor y licencia

- **Autor:** Alvaro Archilla
- **Proyecto:** [WebdriverIO_Gherkin_POC](https://github.com/alvaroarchilla/WebdriverIO_Gherkin_POC)
- **Licencia:** ISC (consulta el archivo `package.json` para más detalles).
