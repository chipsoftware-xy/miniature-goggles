import { Phone, MessageCircle } from 'lucide-react'
import { COMPANY, waLink } from '../config.js'
export default function FloatingContact() {
  return (
    <>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="group fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-white shadow-[0_10px_40px_rgba(37,211,102,.45)] transition hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" aria-hidden />
        <MessageCircle size={26} className="relative" />
        <span className="relative hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[120px] sm:inline">Chat with us</span>
      </a>
      <a href={`tel:${COMPANY.mobileHref}`} aria-label="Call us"
        className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-saffron text-ink shadow-lg lg:hidden">
        <Phone size={24} />
      </a>
    </>
  )
}
