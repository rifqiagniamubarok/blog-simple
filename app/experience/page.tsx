import experiences from '../../data/experience.json';
import ExperienceClient from '../components/experience-client';
import { ExperienceContent } from '../components/experience-content';

export const metadata = {
  title: 'Experience',
  description: 'My professional experience.',
};

export default function Page() {
  return (
    <ExperienceClient>
      <ExperienceContent experiences={experiences} />
    </ExperienceClient>
  );
}