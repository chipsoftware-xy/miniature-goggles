export const products = [
  ['outdoor-led-displays', 'Outdoor LED Displays', 'High-brightness screens built for roadside and rooftop visibility.'],
  ['indoor-led-displays', 'Indoor LED Displays', 'Fine-pitch screens for lobbies, showrooms and control rooms.'],
  ['led-video-walls', 'LED Video Walls', 'Seamless modular walls for events, studios and atriums.'],
  ['digital-signage-displays', 'Digital Signage Displays', 'Networked screens for menus, wayfinding and promotions.'],
  ['led-advertising-boards', 'LED Advertising Boards', 'Eye-catching boards for storefronts and hoardings.'],
  ['lcd-commercial-displays', 'LCD Commercial Displays', 'Durable LCD panels designed for long operating hours.'],
  ['transparent-led-displays', 'Transparent LED Displays', 'See-through screens for glass facades and shop windows.'],
  ['custom-led-display-solutions', 'Custom LED Display Solutions', 'Special shapes, sizes and mounting made to your brief.']
].map(([slug, title, blurb]) => ({ slug, title, blurb, type: 'product' }))

export const industries = [
  ['advertising-outdoor-media', 'Advertising & Outdoor Media', 'Large-format screens for hoardings, junctions and mall frontages.'],
  ['retail-shopping-malls', 'Retail & Shopping Malls', 'Displays that guide shoppers and showcase offers.'],
  ['corporate-offices', 'Corporate Offices', 'Reception walls, meeting-room screens and internal communication.'],
  ['education-institutions', 'Education & Institutions', 'Auditorium screens, notice boards and campus signage.'],
  ['hospitality-entertainment', 'Hospitality & Entertainment', 'Immersive screens for hotels, venues and event spaces.'],
  ['transportation-infrastructure', 'Transportation & Infrastructure', 'Passenger information and public announcement displays.'],
  ['manufacturing-industrial', 'Manufacturing & Industrial Facilities', 'Production dashboards and safety messaging on the shop floor.'],
  ['government-public-spaces', 'Government & Public Spaces', 'Information displays for civic and public venues.']
].map(([slug, title, blurb]) => ({ slug, title, blurb, type: 'industry' }))

export const posts = [
  ['led-display-technology-explained', 'LED Display Technology Explained', 'A plain-language look at pixels, pitch, brightness and refresh rate.'],
  ['indoor-vs-outdoor-led-displays', 'Indoor vs Outdoor LED Displays', 'How brightness, weatherproofing and viewing distance differ.'],
  ['choose-the-right-led-display', 'How to Choose the Right LED Display for Your Business', 'Questions to answer before you request a quote.'],
  ['benefits-of-digital-signage', 'Benefits of Digital Signage', 'Why many businesses are moving from static boards to screens.'],
  ['led-display-maintenance-care', 'LED Display Maintenance and Care', 'Simple habits that keep a display performing for years.']
].map(([slug, title, excerpt]) => ({ slug, title, excerpt, date: '[Publication date]' }))

export const faqs = [
  ['How do I get a price?', 'Send an enquiry with your location, size and use case. Our team will respond with a quote. (Placeholder answer – edit.)'],
  ['Can the display be customised?', 'Yes, size, shape and mounting can be discussed with our team. (Placeholder answer – edit.)'],
  ['Do you provide installation and support?', 'Installation and maintenance are part of our service offering. (Placeholder answer – edit.)']
]
