import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import FloatingContact from './components/FloatingContact.jsx'
import Home from './pages/Home.jsx'
import Detail from './pages/Detail.jsx'
import { Blog, BlogPost } from './pages/Blog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import { products, industries } from './data.js'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
const NotFound = () => (
  <div className="wrap section text-center"><h1 className="text-4xl font-bold">Page not found</h1>
    <Link className="btn btn-primary mt-6" to="/">Back to home</Link></div>
)

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-3">Skip to content</a>
      <ScrollTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Detail.List items={products} title="Our Products" base="/products" />} />
          <Route path="/products/:slug" element={<Detail items={products} base="/products" />} />
          <Route path="/services" element={<Detail.List items={industries} title="Services by Industry" base="/services" />} />
          <Route path="/services/:slug" element={<Detail items={industries} base="/services" />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
