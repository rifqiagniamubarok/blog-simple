'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', name: 'Home', icon: '🏠' },
  { path: '/experience', name: 'Experience', icon: '💼' },
  { path: '/blog', name: 'Blog', icon: '📝' },
  { path: '/project', name: 'Projects', icon: '🚀' },
];

export function ModernNavbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="w-full">
      <div className="space-y-2">
        {navItems.map((item, index) => (
          <motion.div key={item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
            <Link href={item.path} className={`nav-item group ${isActive(item.path) ? 'active' : ''}`}>
              <div className="flex items-center space-x-3">
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Social Links */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 pt-8 border-t border-glass-border">
        <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wider">Connect</h3>
        <div className="space-y-2">
          {[
            { name: 'GitHub', url: 'https://github.com/rifqiagniamubarok', icon: '🐙' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rifqiagniamubarok/', icon: '💼' },
            { name: 'Medium', url: 'https://medium.com/@rifqiagniamubarok', icon: '📖' },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-text-secondary hover:text-neon-blue transition-colors duration-300 group"
            >
              <span className="group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
              <span className="text-sm">{social.name}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
