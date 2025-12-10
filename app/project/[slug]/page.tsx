import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { formatDate, getProjectPosts } from 'app/project/utils';
import { baseUrl } from 'app/sitemap';

export async function generateStaticParams() {
  let projects = getProjectPosts();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }) {
  let project = getProjectPosts().find((project) => project.slug === params.slug);
  if (!project) {
    return;
  }

  let { title, publishedAt: publishedTime, summary: description, image } = project.metadata;
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/project/${project.slug}`,
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

export default function Project({ params }) {
  let project = getProjectPosts().find((project) => project.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: project.metadata.title,
            datePublished: project.metadata.publishedAt,
            dateModified: project.metadata.publishedAt,
            description: project.metadata.summary,
            image: project.metadata.image ? `${baseUrl}${project.metadata.image}` : `/og?title=${encodeURIComponent(project.metadata.title)}`,
            url: `${baseUrl}/project/${project.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">{project.metadata.title}</h1>
      <div className="flex justify-between items-center mt-2 mb-4 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(project.metadata.publishedAt)}</p>
        <div className="flex gap-2">
          {project.metadata.github && (
            <a
              href={project.metadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 px-3 py-1 rounded transition-colors"
            >
              GitHub
            </a>
          )}
          {project.metadata.demo && (
            <a
              href={project.metadata.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
      {project.metadata.technologies && (
        <div className="flex flex-wrap gap-2 mb-8">
          {project.metadata.technologies.map((tech) => (
            <span key={tech} className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-3 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
      )}
      <article className="prose">
        <CustomMDX source={project.content} />
      </article>
    </section>
  );
}
