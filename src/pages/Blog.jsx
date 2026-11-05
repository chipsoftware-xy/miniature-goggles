import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { PostCard } from './Home.jsx'
import { posts } from '../data.js'
import { img } from '../config.js'

export function Blog() {
  return (
    <section className="wrap section">
      <Seo title="Blog" description="Insights on LED display technology, signage and maintenance." />
      <h1 className="text-4xl font-extrabold">Blog and Insights</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map(p => <PostCard key={p.slug} p={p} />)}</div>
    </section>
  )
}

export function BlogPost() {
  const post = posts.find(p => p.slug === useParams().slug)
  if (!post) return <div className="wrap section"><Link to="/blog" className="btn btn-primary">Back to blog</Link></div>
  return (
    <article className="wrap section max-w-3xl">
      <Seo title={post.title} description={post.excerpt} />
      <time className="text-ink/50">{post.date}</time>
      <h1 className="mt-2 text-4xl font-extrabold">{post.title}</h1>
      <img src={img(post.title, 1000, 500)} alt="" className="mt-6 rounded-lg" />
      <p className="mt-6 text-lg text-ink/80">{post.excerpt}</p>
      <p className="mt-4 text-ink/70">[Placeholder article body. Replace with your own written content.]</p>
      <Link to="/blog" className="btn btn-line mt-8">All articles</Link>
    </article>
  )
}
