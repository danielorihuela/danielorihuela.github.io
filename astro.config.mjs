// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://danielorihuela.dev/',
    integrations: [mdx(), sitemap()],
    markdown: {
        shikiConfig: {
            theme: 'poimandres',
        },
    },
    trailingSlash: 'always',

    // The build and vite options are required to ensure
    // that image are correctly prefixed in the rss feed
    build: {
        assetsPrefix: 'https://danielorihuela.dev/'
    },
    vite: {
        plugins: [tailwindcss()],
        ssr: {
            external: ['astro/container', '@astrojs/mdx'],
        },
    },
});

