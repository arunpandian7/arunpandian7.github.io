import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
    site: 'https://arunpandian7.github.io',
    integrations: [
        preact({ compat: true, debug: true }),
        sitemap(),
        tailwind(),
    ],
})

