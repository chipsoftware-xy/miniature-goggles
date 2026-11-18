import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import ScreenVisual from '../components/ScreenVisual.jsx'
import { PostCard } from '../components/Cards.jsx'
import { Reveal } from '../components/fx.jsx'
import { posts } from '../data.js'

export function Blog() {
  return (
    <>
      <Seo title="Insights" description="Insights on LED display technology, signage and maintenance." />
      <PageHero eyebrow="Insights" title="Learn the language of light." sub="Plain-language guides to pixels, brightness and choosing the right screen." crumbs={[['/', 'Home']]} />
      <section className="wrap section pt-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 80}><PostCard p={p} /></Reveal>)}</div>
      </section>
    </>
  )
}

export function BlogPost() {
  const post = posts.find(p => p.slug === useParams().slug)
  if (!post) return <PageHero title="Article not found"><Link to="/blog" className="btn btn-primary mt-6">Back to insights</Link></PageHero>
  return (
    <article className="wrap max-w-3xl pb-24 pt-32">
      <Seo title={post.title} description={post.excerpt} />
      <Link to="/blog" className="font-mono text-xs text-white/40 hover:text-saffron">← All insights</Link>
      <time className="mt-6 block font-mono text-sm text-white/40">{post.date}</time>
      <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">{post.title}</h1>
      <ScreenVisual scene={post.scene} className="mt-8" />
      <p className="mt-8 text-xl text-white/80">{post.excerpt}</p>
      <p className="mt-4 text-white/55">[Placeholder article body. Replace with your own written content.]</p>
    </article>
  )
}
