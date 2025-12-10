import Link from 'next/link';
import { formatDate, getProjectPosts } from 'app/project/utils';
import { ProjectPostsClient } from './projects-client';

export function ProjectPosts() {
  const allProjects = getProjectPosts();

  const sortedProjects = allProjects.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return <ProjectPostsClient projects={sortedProjects} />;
}