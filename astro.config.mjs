// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://danielorihuela.dev/',
    integrations: [mdx(), sitemap(), tailwind()],
    markdown: {
        shikiConfig: {
            theme: 'dracula',
        },
    },
    trailingSlash: 'always',

    // The build and vite options are required to ensure
    // that image are correctly prefixed in the rss feed
    build: {
        assetsPrefix: 'https://danielorihuela.dev/'
    },
    vite: {
        ssr: {
        external: ['astro/container', '@astrojs/mdx'],
        },
    },
});