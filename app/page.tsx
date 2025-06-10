import { BlogPosts } from 'app/components/posts';

const aboutParagraphs = [
  "I'm a developer who thrives at the crossroads of design and development. I am dedicated to creating user experiences that are not only visually appealing but also optimized for performance and accessibility.",
  'My development journey began during the COVID-19 pandemic. I wasn’t in a computer-related major, and at the time, I felt that pursuing a career in electronics offered limited opportunities. So, I started learning programming on my own. After two years of self-study, I fell in love with it.',
  'I have experience in both front-end and back-end development. I enjoy solving problems and designing user interfaces and experiences. I love learning new things to stay up to date with current technologies.',
  'As a developer, I hold myself to a standard of delivering work that is fast, secure, and easy to maintain. I believe that clean and scalable architecture is the key to long-term success in any project.',
];

export default function Page() {
  return (
    <section>
      <h1 className="text-xl font-semibold tracking-tighter">Hi, I am</h1>
      <h1 className="mb-8 text-3xl font-semibold tracking-tighter">Rifqi Agnia Mubarok</h1>
      <div className="space-y-4">
        {aboutParagraphs.map((text, idx) => (
          <p className="" key={idx}>
            {text}
          </p>
        ))}
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
