// ---- EDIT THESE: contact details live here (taken from smartchiptree.com) ----
export const COMPANY = {
  name: 'KalpLabs',
  whatsapp: '919560966088',      // digits with country code
  mobile: '+91 95609 66088',
  mobileHref: '+919560966088',
  email: 'support@smartchiptree.com',
  linkedin: 'https://www.linkedin.com/in/smart-chip-tree-llp-instant-identity-issuance-solutions-665782a/',
  indiamart: 'https://www.indiamart.com/smartchip-tree/'
}

// Offices. lat/lon are only used to place the dots on the India LED map.
export const OFFICES = [
  { city: 'Delhi', tag: 'Head office', lat: 28.63, lon: 77.24, address: '403, Pratap Bhawan, ITO Bahadur Shah Zafar Marg, Delhi 110002' },
  { city: 'Noida', tag: 'NCR office', lat: 28.62, lon: 77.38, address: 'SH-007, Ground Floor, Sector 63, Noida 201309' },
  { city: 'Pune', tag: 'West', lat: 18.52, lon: 73.86, address: '4/495, Shaniwar Peth, Bajirao Road, Mantri Heights, Near Hotel Basera, Pune' },
  { city: 'Bengaluru', tag: 'South', lat: 12.85, lon: 77.66, address: '405, 4th Floor, 170 & 171, Green House Layout, Doddathogur Main Road, Electronic City, Bengaluru 560100, Karnataka' }
]
export const HQ = OFFICES[0]

export const mapEmbed = address => `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`

export const waLink = (text = 'Hello KalpLabs, I would like to enquire about LED/LCD displays.') =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`
