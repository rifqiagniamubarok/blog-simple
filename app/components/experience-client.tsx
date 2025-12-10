'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

interface ExperienceClientProps {
  children: React.ReactNode;
}

export default function ExperienceClient({ children }: ExperienceClientProps) {
  return (
    <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="glass-card p-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent mb-4">Experience</h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          My professional journey in software development, showcasing the roles, responsibilities, and technologies I've worked with.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>{children}</motion.div>
    </motion.section>
  );
}
