import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/single_page_design_portfolio/',
  plugins: [tailwindcss()],
  build: {
    outDir: 'docs',
  },
});
