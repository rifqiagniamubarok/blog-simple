# Personal Blog - Rifqi Agnia Mubarok

A modern, minimalist personal blog built with Next.js, showcasing my journey as a developer, thoughts on technology, and technical tutorials.

## 🚀 Live Demo

Visit the live blog at: [Your Blog URL]

## ✨ Features

- **Modern Design**: Clean and minimal interface focusing on content readability
- **MDX Support**: Write blog posts in MDX format with embedded React components
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Built with Next.js App Router for optimal performance
- **SEO Friendly**: Automatic sitemap generation and meta tags
- **RSS Feed**: Subscribe to updates via RSS
- **Terminal Component**: Interactive terminal-style components for enhanced UX
- **Experience Page**: Showcase professional experience and skills
- **Fast Loading**: Optimized images and assets

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/) with [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) & [Speed Insights](https://vercel.com/docs/speed-insights)
- **Fonts**: [Geist](https://vercel.com/font)
- **Syntax Highlighting**: [Sugar High](https://github.com/huozhi/sugar-high)

## 📝 Blog Posts

Current blog posts include:

- **Kick File Out of From Your Node.js REST API!!** - Handling file uploads in Express.js vs Hono
- **Send Emails with SMTP the Right Way** - Best practices for email implementation
- **Why I Started Removing ID from My Database Table** - Database design considerations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/rifqiagniamubarok/blog-simple.git
cd blog-simple
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
├── app/
│   ├── blog/                 # Blog-related pages and utilities
│   │   ├── posts/           # MDX blog posts
│   │   └── [slug]/          # Dynamic blog post pages
│   ├── components/          # Reusable React components
│   │   ├── LoadingCover/    # Loading components
│   │   └── Terminal/        # Terminal-style components
│   ├── experience/          # Professional experience page
│   ├── og/                  # Open Graph image generation
│   └── rss/                 # RSS feed generation
├── data/                    # JSON data files
├── public/                  # Static assets and images
└── posts/                   # Blog post assets
```

## ✍️ Writing Blog Posts

Blog posts are written in MDX format and stored in `app/blog/posts/`. Each post should include frontmatter with:

```mdx
---
title: 'Your Post Title'
publishedAt: 'YYYY-MM-DD'
summary: 'Brief description of your post'
---

Your content here...
```

## 🎨 Customization

- **Styling**: Modify Tailwind classes in components or update `tailwind.config.js`
- **Content**: Update the about section in `app/page.tsx`
- **Experience**: Modify `data/experience.json` to update professional experience
- **Colors & Theme**: Adjust the color scheme in Tailwind configuration

## 📈 Performance

This blog is optimized for performance with:

- Next.js App Router for efficient routing
- Static generation for blog posts
- Optimized images and assets
- Minimal JavaScript bundle size
- Fast loading times

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server

## 📱 Responsive Design

The blog is fully responsive and tested across:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

This is a personal blog, but if you find any bugs or have suggestions, feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🏗️ Built by

**Rifqi Agnia Mubarok** - Full-stack Developer passionate about creating exceptional user experiences.

- 💼 [Experience](/experience)
- 📝 [Blog](/blog)
- 🌐 [GitHub](https://github.com/rifqiagniamubarok)

---

> "I'm a developer who thrives at the crossroads of design and development, dedicated to creating user experiences that are not only visually appealing but also optimized for performance and accessibility."
