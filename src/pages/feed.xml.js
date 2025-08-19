import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context) {
    const blogPosts = await getCollection('blog');

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
        items: blogPosts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            customData: post.data.customData,
            link: `/blog/${post.slug}/`,
            content: sanitizeHtml(parser.render(post.body)),
            author: 'danielorihuelarodriguez@gmail.com (Daniel Orihuela)'
        })),
    });
}