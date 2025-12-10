import { ProjectPosts } from 'app/components/projects';
import ProjectClient from '../components/project-client';

export const metadata = {
  title: 'Projects',
  description: 'Check out my projects.',
};

export default function Page() {
  return (
    <ProjectClient>
      <ProjectPosts />
    </ProjectClient>
  );
}