// ---- EDIT THESE: all placeholder contact details and images live here ----
export const COMPANY = {
  name: 'XYZ',
  whatsapp: 'YOUR_WHATSAPP_NUMBER', // digits with country code, e.g. 919999999999
  mobile: 'YOUR_MOBILE_NUMBER',     // e.g. +919999999999
  email: 'info@your-domain.in',
  address: '[Company address – replace]',
  mapEmbed: '' // paste a Google Maps embed URL here
}
export const waLink = (text = 'Hello XYZ, I would like to enquire about LED/LCD displays.') =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`
// Placeholder images – replace with real photography URLs or files in /public
export const img = (label, w = 800, h = 500) =>
  `https://placehold.co/${w}x${h}/1D232D/F5F6F8?text=${encodeURIComponent(label)}`
