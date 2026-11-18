// `scene` picks the animated screen visual (see components/ScreenVisual.jsx).
// `env` drives the filter chips on the products page.
// `specs`: replace the '—' values with figures from the product catalogue PDF.
const SPEC_KEYS = ['Pixel pitch', 'Brightness', 'Cabinet size', 'Refresh rate', 'Ingress protection', 'Warranty']
const blankSpecs = () => SPEC_KEYS.map(k => [k, '—'])

export const products = [
  { slug: 'outdoor-led-displays', title: 'Outdoor LED Displays', env: 'outdoor', scene: 'sunset',
    blurb: 'High-brightness screens built for roadside and rooftop visibility.',
    apps: ['Highway & junction hoardings', 'Building facades', 'Stadium perimeters'] },
  { slug: 'indoor-led-displays', title: 'Indoor LED Displays', env: 'indoor', scene: 'aurora',
    blurb: 'Fine-pitch screens for lobbies, showrooms and control rooms.',
    apps: ['Corporate lobbies', 'Control rooms', 'Showrooms'] },
  { slug: 'led-video-walls', title: 'LED Video Walls', env: 'indoor', scene: 'mosaic',
    blurb: 'Seamless modular walls for events, studios and atriums.',
    apps: ['Events & concerts', 'Broadcast studios', 'Mall atriums'] },
  { slug: 'digital-signage-displays', title: 'Digital Signage Displays', env: 'indoor', scene: 'menu',
    blurb: 'Networked screens for menus, wayfinding and promotions.',
    apps: ['QSR menu boards', 'Wayfinding', 'In-store promotions'] },
  { slug: 'led-advertising-boards', title: 'LED Advertising Boards', env: 'outdoor', scene: 'ticker',
    blurb: 'Eye-catching boards for storefronts and hoardings.',
    apps: ['Storefronts', 'Petrol pumps', 'Mall frontages'] },
  { slug: 'lcd-commercial-displays', title: 'LCD Commercial Displays', env: 'indoor', scene: 'dashboard',
    blurb: 'Durable LCD panels designed for long operating hours.',
    apps: ['Meeting rooms', 'Classrooms', 'Production dashboards'] },
  { slug: 'transparent-led-displays', title: 'Transparent LED Displays', env: 'special', scene: 'glass',
    blurb: 'See-through screens for glass facades and shop windows.',
    apps: ['Glass facades', 'Shop windows', 'Exhibition stages'] },
  { slug: 'custom-led-display-solutions', title: 'Custom LED Display Solutions', env: 'special', scene: 'orbit',
    blurb: 'Special shapes, sizes and mounting made to your brief.',
    apps: ['Curved & cylindrical walls', 'Floor & ceiling screens', 'Brand installations'] }
].map(p => ({ ...p, type: 'product', specs: blankSpecs() }))

export const industries = [
  ['advertising-outdoor-media', 'Advertising & Outdoor Media', 'Large-format screens for hoardings, junctions and mall frontages.', 'sunset'],
  ['retail-shopping-malls', 'Retail & Shopping Malls', 'Displays that guide shoppers and showcase offers.', 'menu'],
  ['corporate-offices', 'Corporate Offices', 'Reception walls, meeting-room screens and internal communication.', 'aurora'],
  ['education-institutions', 'Education & Institutions', 'Auditorium screens, notice boards and campus signage.', 'dashboard'],
  ['hospitality-entertainment', 'Hospitality & Entertainment', 'Immersive screens for hotels, venues and event spaces.', 'mosaic'],
  ['transportation-infrastructure', 'Transportation & Infrastructure', 'Passenger information and public announcement displays.', 'ticker'],
  ['manufacturing-industrial', 'Manufacturing & Industrial Facilities', 'Production dashboards and safety messaging on the shop floor.', 'dashboard'],
  ['government-public-spaces', 'Government & Public Spaces', 'Information displays for civic and public venues.', 'glass']
].map(([slug, title, blurb, scene]) => ({ slug, title, blurb, scene, type: 'industry', apps: [] }))

// General LED packaging technologies (industry knowledge, not product claims)
export const techs = [
  { key: 'SMD', name: 'SMD', full: 'Surface-Mounted Device',
    text: 'Red, green and blue chips sit together in one tiny package. The most common, cost-effective choice for indoor and outdoor screens.',
    best: 'Everyday indoor & outdoor', look: 'smd' },
  { key: 'COB', name: 'COB', full: 'Chip-on-Board',
    text: 'Bare chips are bonded straight to the board and sealed under one smooth layer. Very fine pitch, deep blacks and tough to knock.',
    best: 'Fine-pitch control rooms & boardrooms', look: 'cob' },
  { key: 'GOB', name: 'GOB', full: 'Glue-on-Board',
    text: 'Standard SMD modules get a clear protective coat on top. Better against dust, moisture and impact, ideal for rental and touchable walls.',
    best: 'Rental, events & public spaces', look: 'gob' }
]

export const process = [
  ['Consult', 'Tell us the site, the content and the budget. We recommend the right type and pitch.'],
  ['Site survey', 'Our team measures the wall, viewing distance, power and structure on location.'],
  ['Design', 'Screen size, resolution, mounting and controller are drawn up for your approval.'],
  ['Install', 'Trained crews build the structure, mount the cabinets and calibrate colour.'],
  ['Support', 'Training, spare modules and service help once the display is live.']
]

export const posts = [
  ['led-display-technology-explained', 'LED Display Technology Explained', 'A plain-language look at pixels, pitch, brightness and refresh rate.', 'mosaic'],
  ['indoor-vs-outdoor-led-displays', 'Indoor vs Outdoor LED Displays', 'How brightness, weatherproofing and viewing distance differ.', 'sunset'],
  ['choose-the-right-led-display', 'How to Choose the Right LED Display for Your Business', 'Questions to answer before you request a quote.', 'aurora'],
  ['benefits-of-digital-signage', 'Benefits of Digital Signage', 'Why many businesses are moving from static boards to screens.', 'menu'],
  ['led-display-maintenance-care', 'LED Display Maintenance and Care', 'Simple habits that keep a display performing for years.', 'dashboard']
].map(([slug, title, excerpt, scene]) => ({ slug, title, excerpt, scene, date: '[Publication date]' }))

export const faqs = [
  ['How do I get a price?', 'Send an enquiry or WhatsApp us with your location, rough screen size and what it will show. Our team replies with options and a quote.'],
  ['What pixel pitch do I need?', 'A simple rule: the closest comfortable viewing distance in metres is roughly the pitch in millimetres. Try the calculator on this site for a first estimate.'],
  ['Can the display be customised?', 'Yes. Size, shape, curvature and mounting can all be designed around your site.'],
  ['Do you provide installation and support?', 'Yes. We survey the site, install, calibrate and support the display after it goes live.'],
  ['Which cities do you cover?', 'We have offices in Delhi, Noida, Pune and Bengaluru and work on projects across India.']
]
