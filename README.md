<h1 align="center">A List of Extraordinary Words</h1>

<p align="center">
  A curated list of extraordinary words and their definitions, built with
  <a href="https://astro.build/">Astro</a> and deployed to GitHub Pages.
</p>

<p align="center">
  🌐 <a href="https://words.grahn.us">words.grahn.us</a>
</p>

## 🧰 Requirements

This project uses Astro 6, which requires **Node.js >= 22.12.0**.

The required version is pinned in [`.nvmrc`](./.nvmrc). If you use [nvm](https://github.com/nvm-sh/nvm), run:

```shell
nvm use
```

## 🚀 Quick start

1. **Install dependencies.**

   ```shell
   npm ci
   ```

2. **Start the dev server.**

   ```shell
   npm run dev
   ```

   The site is now running at http://localhost:4321.

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                            |
| :---------------- | :------------------------------------------------ |
| `npm run dev`     | Start the local dev server at `localhost:4321`    |
| `npm run build`   | Build the production site to `./dist/`            |
| `npm run preview` | Preview the build locally before deploying        |
| `npm run check`   | Run Astro's type and content checks               |
| `npm test`        | Run the test suite with [Vitest](https://vitest.dev/) |

## 🗂️ Project structure

```text
/
├── public/                 # Static assets copied as-is (CNAME, icon, divider)
├── src/
│   ├── content/
│   │   └── words.yml        # The list of words (data source)
│   ├── content.config.ts    # Content collection schema for words.yml
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro      # Home page — renders words grouped by letter
│   │   └── 404.astro
│   └── utils/
│       ├── fetchDefinitions.js
│       └── wordUtils.js
├── astro.config.mjs
└── .nvmrc                   # Pinned Node.js version
```

## ✍️ Adding words

Add an entry to [`src/content/words.yml`](./src/content/words.yml):

```yaml
- word: extraordinary
```

Definitions are fetched automatically at build time by `src/utils/fetchDefinitions.js`.

## 🚢 Deployment

The site deploys to GitHub Pages via the
[`.github/workflows/astro.yml`](./.github/workflows/astro.yml) workflow on every
push to `main`. The workflow reads the Node.js version from `.nvmrc`, so updating
that file keeps local development and CI in sync.

The custom domain (`words.grahn.us`) is configured through
[`public/CNAME`](./public/CNAME), which Astro copies into the build output.

## 📚 Learn more

- [Astro documentation](https://docs.astro.build/)
- [Deploying an Astro site to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
