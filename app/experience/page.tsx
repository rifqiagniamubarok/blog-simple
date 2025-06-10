import experiences from '../../data/experience.json';

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
};

function ExperienceItem({ content }: { content: any }) {
  return (
    <div className="mb-2">
      <h3 className="font-medium text-xl mb-2">{content.position}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        {content.date} {content.duration !== '-' && <span className="">({content.duration})</span>}
      </p>

      <ul className="list-disc list-inside space-y-2">
        {content.description.map((desc: string, idx: number) => (
          <li key={idx} className="text-neutral-700 dark:text-neutral-300">
            {desc}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {content.tech.map((tech: string, idx: number) => (
          <span key={idx} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Experience</h1>
      <div className="">
        {experiences.map((company, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="font-semibold text-2xl mb-2">{company.company}</h2>
            {company.contents.map((content, contentIdx) => (
              <ExperienceItem key={contentIdx} content={content} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
