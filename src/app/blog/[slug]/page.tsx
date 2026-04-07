import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { compileMDX } from 'next-mdx-remote/rsc';
import BlogShare from '@/components/BlogShare';

export const dynamicParams = true;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: `${post.title} | techKoodaram`,
      description: post.description,
      alternates: {
        canonical: `/blog/${params.slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        authors: [post.author],
        publishedTime: post.date,
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function BlogPost({ params }: PageProps) {
  try {
    const post = getPostBySlug(params.slug);

    // Compile MDX content
    const { content } = await compileMDX({
      source: post.content,
      options: {
        parseFrontmatter: false,
      },
    });

    return (
      <article className="container mx-auto px-4 pt-32 md:px-5 md:pt-32 pb-24 w-full max-w-[720px]">
        {/* Blog Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              image: post.coverImage ? `https://techkoodaram.in${post.coverImage}` : "https://techkoodaram.in/og-image.png",
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: post.author,
                url: post.authorUrl || "https://techkoodaram.in",
              },
              publisher: {
                "@type": "Organization",
                name: "techKoodaram",
                logo: {
                  "@type": "ImageObject",
                  url: "https://techkoodaram.in/logo.png",
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://techkoodaram.in/blog/${params.slug}`,
              },
            }),
          }}
        />
        <div className="mb-8">
          <Link href="/blog" className="text-primary hover:underline mb-4 inline-block">
            &larr; Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-500 mb-8 border-b pb-4">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} by {post.authorUrl ? (
              <a
                href={post.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {post.author}
              </a>
            ) : (
              post.author
            )}
          </div>
        </div>

        {post.coverImage ? (
          <div className="relative w-full overflow-hidden rounded-lg my-10 shadow-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={720}
              height={0}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        ) : null}

        {post.youtubeId ? (
          <div className="mb-10">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${post.youtubeId}`}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}

        <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-primary prose-a:text-primary prose-img:rounded-lg">
          {content}
          <div className="my-10 border-t pt-8">
            <BlogShare title={post.title} slug={post.slug} />
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    notFound();
  }
}
