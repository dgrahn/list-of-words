import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://words.grahn.us',
  base: process.env.PATH_PREFIX || '/',
});
