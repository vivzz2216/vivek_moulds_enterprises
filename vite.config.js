import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        products: resolve(import.meta.dirname, 'products.html'),
        gallery: resolve(import.meta.dirname, 'gallery.html'),
        contact: resolve(import.meta.dirname, 'contact.html')
      }
    }
  }
});
