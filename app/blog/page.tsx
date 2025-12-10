import { BlogPosts } from 'app/components/posts'
import BlogClient from '../components/blog-client';

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <BlogClient>
      <BlogPosts />
    </BlogClient>
  )
}