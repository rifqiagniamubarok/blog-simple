import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { formatDate, getBlogPosts } from 'app/blog/utils';
import { baseUrl } from 'app/sitemap';

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image ? `${baseUrl}${post.metadata.image}` : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Rifqi Agnia Mubarok',
            },
          }),
        }}
      />

      {/* Header */}
      <div className="glass-card p-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent mb-4">{post.metadata.title}</h1>
        <div className="flex items-center justify-between text-sm">
          <p className="text-neon-blue font-mono bg-neon-blue/10 px-3 py-1 rounded">{formatDate(post.metadata.publishedAt)}</p>
          {post.metadata.summary && <p className="text-text-secondary italic">{post.metadata.summary}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="glass-card p-8">
        <article className="prose prose-lg max-w-none">
          <CustomMDX source={post.content} />
        </article>
      </div>
    </section>
  );
}
