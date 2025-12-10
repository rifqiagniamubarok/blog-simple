import Link from 'next/link';
import { formatDate, getProjectPosts } from 'app/project/utils';

export function ProjectPosts() {
  let allProjects = getProjectPosts();

  return (
    <div>
      {allProjects
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((project) => (
          <Link key={project.slug} className="flex flex-col space-y-1 mb-4" href={`/project/${project.slug}`}>
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[110px] tabular-nums">{formatDate(project.metadata.publishedAt, false)}</p>
              <div className="flex-1">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">{project.metadata.title}</p>
                {project.metadata.technologies && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.metadata.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
