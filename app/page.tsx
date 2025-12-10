import { BlogPosts } from 'app/components/posts';
import HomeClient from './components/home-client';

export default function Page() {
  return (
    <HomeClient>
      <BlogPosts />
    </HomeClient>
  );
}