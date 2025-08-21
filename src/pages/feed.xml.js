import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
    const renderers = await loadRenderers([getMDXRenderer()]);
    const container = await AstroContainer.create({ renderers });
    const posts = await getCollection('blog');

    const items = [];
    for (const post of posts) {
        const { Content } = await post.render();
        items.push({
            title: post.data.title,
            author: 'danielorihuelarodriguez@gmail.com (Daniel Orihuela)',
            pubDate: post.data.publishdate,
            customData: post.data.customData,
            link: new URL(`/blog/${post.slug}/`, context.url.origin).toString(),
            description: post.data.description,
            content: `<figure><img alt="" src="${post.data.cover.src}" /></figure> ${await container.renderToString(Content)}`,
         });
    }

    return rss({
        title: 'Daniel Orihuela\'s Blog',
        description: 'Dive into the fascinating world of software development, security, and AI with Daniel Orihuela.',
        site: context.site,
        xmlns: {
            'atom': 'http://www.w3.org/2005/Atom'
        },
        customData:
            `<atom:link href="${new URL('feed.xml', context.site)}" rel="self" type="application/rss+xml" />`
        ,
        items,
    });
}