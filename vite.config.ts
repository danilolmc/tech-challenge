import {resolve} from "path"
import react from "@vitejs/plugin-react"
import {VitePWA} from 'vite-plugin-pwa';
import {defineConfig, PluginOption} from "vite"

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: 'Loanship',
                short_name: 'Loanship',
                description: 'Loans App',
                theme_color: '#38C1A3',
                icons: [
                    {
                        src: 'pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ],
            },
        }) as PluginOption,
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
})
