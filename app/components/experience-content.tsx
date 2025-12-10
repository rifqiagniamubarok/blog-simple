'use client';

import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function ExperienceItem({ content }: { content: any }) {
  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div>
          <h3 className="font-semibold text-xl text-white mb-2">{content.position}</h3>
          <p className="text-neon-blue font-mono bg-neon-blue/10 px-3 py-1 rounded text-sm inline-block">
            {content.date} {content.duration !== '-' && <span>({content.duration})</span>}
          </p>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {content.description.map((desc: string, idx: number) => (
          <li key={idx} className="text-text-secondary flex items-start">
            <span className="text-neon-blue mr-3 mt-1">▸</span>
            <span>{desc}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {content.tech.map((tech: string, idx: number) => (
          <span key={idx} className="px-3 py-1 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-full text-sm font-medium">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

interface ExperienceContentProps {
  experiences: Array<{
    company: string;
    contents: Array<{
      position: string;
      date: string;
      duration: string;
      description: string[];
      tech: string[];
    }>;
  }>;
}

export function ExperienceContent({ experiences }: ExperienceContentProps) {
  return (
    <>
      {experiences.map((company, idx) => (
        <motion.div key={idx} variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: idx * 0.1 }} className="mb-12">
          <div className="glass-card p-8 mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full mr-3"></span>
              {company.company}
            </h2>
          </div>

          <div className="space-y-4">
            {company.contents.map((content, contentIdx) => (
              <ExperienceItem key={contentIdx} content={content} />
            ))}
          </div>
        </motion.div>
      ))}
    </>
  );
}
