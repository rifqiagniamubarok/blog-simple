'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDate } from 'app/lib/utils';

interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
  };
  content: string;
}

interface BlogPostsClientProps {
  posts: BlogPost[];
}

export function BlogPostsClient({ posts }: BlogPostsClientProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <motion.div key={post.slug} variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}>
          <Link href={`/blog/${post.slug}`} className="block group">
            <div className="glass-card glass-card-hover p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-neon-blue transition-colors duration-300 mb-2">{post.metadata.title}</h3>
                  {post.metadata.summary && <p className="text-text-secondary text-sm line-clamp-2 mb-3">{post.metadata.summary}</p>}
                </div>
                <div className="md:ml-6 md:text-right">
                  <p className="text-xs text-neon-blue font-mono bg-neon-blue/10 px-2 py-1 rounded">{formatDate(post.metadata.publishedAt, false)}</p>
                </div>
              </div>

              {/* Hover effect indicator */}
              <div className="mt-4 flex items-center text-text-secondary group-hover:text-neon-blue transition-colors duration-300">
                <span className="text-sm font-medium">Read more</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
