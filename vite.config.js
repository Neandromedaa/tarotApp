import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: {
                tsconfigPath: './tsconfig.app.json',
            },
            eslint: {
                lintCommand: 'eslint ./src',
            },
        }),
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/app/styles/colors" as _colors;\n@use "@/app/styles/vars" as _vars;`,
            },
        },
    },
    server: {
        open: true,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    redux: ['@reduxjs/toolkit', 'react-redux'],
                },
            },
        },
        sourcemap: true,
    },
});
