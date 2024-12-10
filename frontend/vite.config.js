import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    root: 'frontend',
    build: {
        outDir: 'dist'
    },
    plugins: [vue()],
    server: {
        port: 3002
    },
    resolve: {
        alias: {
            '@styles': path.resolve(__dirname, 'frontend/src/assets/styles'),
            '@images': path.resolve(__dirname, 'frontend/src/assets/images'),
        }
    }
});