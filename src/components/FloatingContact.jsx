import { Phone, MessageCircle } from 'lucide-react'
import { COMPANY, waLink } from '../config.js'
export default function FloatingContact() {
  return (
    <>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105">
        <MessageCircle size={28} />
      </a>
      <a href={`tel:${COMPANY.mobile}`} aria-label="Call us"
        className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-saffron text-ink shadow-lg lg:hidden">
        <Phone size={26} />
      </a>
    </>
  )
}
