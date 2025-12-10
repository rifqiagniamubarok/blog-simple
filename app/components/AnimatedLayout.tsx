'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const routeOrder = ['/', '/experience', '/blog', '/project'];

interface AnimatedLayoutProps {
  children: ReactNode;
}

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname();

  // Get route index for slide direction
  const currentIndex = routeOrder.findIndex((route) => {
    if (route === '/' && pathname === '/') return true;
    if (route !== '/' && pathname.startsWith(route)) return true;
    return false;
  });

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const transition = {
    x: { type: 'spring' as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  return (
    <AnimatePresence mode="wait" custom={currentIndex}>
      <motion.div key={pathname} custom={currentIndex} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={transition} className="w-full">
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
