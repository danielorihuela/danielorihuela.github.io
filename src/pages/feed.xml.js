import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
    const blogPosts = await getCollection('blog');

    return rss({
        title: 'Daniel Orihuela\'s Blog',
        description: 'Dive into the fascinating world of software development, security, and AI with Daniel Orihuela.',
        site: context.site,
        items: blogPosts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            customData: post.data.customData,
            link: `/blog/${post.slug}/`,
            author: 'danielorihuelarodriguez@gmail.com'
        })),
    });
}