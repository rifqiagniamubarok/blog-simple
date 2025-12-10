import Link from 'next/link';
import { formatDate, getBlogPosts } from 'app/blog/utils';
import { BlogPostsClient } from './posts-client';

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  const sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return <BlogPostsClient posts={sortedBlogs} />;
}
