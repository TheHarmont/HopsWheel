import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    build: {
        outDir: '../wwwroot',
        emptyOutDir: true,   
    },
    server: {
        port: 3000,
        strictPort: true,
        proxy: {
            '/api': {
                target: 'https://localhost:7267',
                changeOrigin: true,
            },
        },
    },
})
