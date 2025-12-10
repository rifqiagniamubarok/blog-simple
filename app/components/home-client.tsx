'use client';

import { motion } from 'framer-motion';

const aboutParagraphs = [
  "I'm a developer who thrives at the crossroads of design and development. I am dedicated to creating user experiences that are not only visually appealing but also optimized for performance and accessibility.",
  "My development journey began during the COVID-19 pandemic. I wasn't in a computer-related major, and at the time, I felt that pursuing a career in electronics offered limited opportunities. So, I started learning programming on my own. After two years of self-study, I fell in love with it.",
  'I have experience in both front-end and back-end development. I enjoy solving problems and designing user interfaces and experiences. I love learning new things to stay up to date with current technologies.',
  'As a developer, I hold myself to a standard of delivering work that is fast, secure, and easy to maintain. I believe that clean and scalable architecture is the key to long-term success in any project.',
];

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

interface HomeClientProps {
  children: React.ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  return (
    <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="glass-card p-8">
        <motion.h1 variants={itemVariants} className="text-xl font-medium text-text-secondary mb-2">
          Hi, I am
        </motion.h1>
        <motion.h1 variants={itemVariants} className="text-5xl font-bold bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent mb-6">
          Rifqi Agnia Mubarok
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl text-text-secondary leading-relaxed">
          Full-stack Developer & UI/UX Enthusiast
        </motion.p>
      </motion.div>

      {/* About Section */}
      <motion.div variants={itemVariants} className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>
        <div className="space-y-6">
          {aboutParagraphs.map((text, idx) => (
            <motion.p key={idx} variants={itemVariants} className="text-text-secondary leading-relaxed">
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Latest Blog Posts */}
      <motion.div variants={itemVariants} className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Latest Blog Posts</h2>
        {children}
      </motion.div>

      {/* CTA Section */}
      <motion.div variants={itemVariants} className="glass-card p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-4">Let's Work Together</h3>
        <p className="text-text-secondary mb-6">I'm always open to discussing new opportunities and interesting projects.</p>
        <motion.a href="mailto:rifqiagniamubarok@gmail.com" className="neon-button inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Get In Touch
        </motion.a>
      </motion.div>
    </motion.section>
  );
}
