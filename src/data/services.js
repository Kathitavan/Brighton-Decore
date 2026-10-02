// src/data/services.js
// Single source of truth dataset for Brighton Decor Canada Services

export const services = [
  {
    id: 'blinds',
    name: 'Window Blinds',
    category: 'WINDOW SOLUTIONS',
    tagline: 'Quiet control. Beautifully finished.',
    image: '/assets/imgs/products/roller-blinds.jpg',
    description: 'Premium blinds in every style — roller, zebra, honeycomb, vertical, wooden, and PVC — expertly fitted for any window.',
    longDescription:
      'We carry an extensive range of window blinds to suit every taste, window type, and budget. From the clean minimalism of roller blinds to the warm character of wooden and faux-wood options, we help you find the perfect match. All products are measured precisely and installed professionally.',
    icon: 'Layers',
    features: ['Roller Blinds', 'Zebra Blinds', 'Honeycomb Blinds', 'Vertical Blinds', 'Wooden & Faux Wood', 'PVC Blinds'],
  },
  {
    id: 'window-coverings',
    name: 'Window Coverings',
    category: 'CUSTOM DRAPERY',
    tagline: 'Light, shadow, and architectural drape.',
    image: '/assets/imgs/decore/IMG_0057.JPG.jpeg',
    description: 'Complete window solutions — from bespoke French door drapery and pinch pleats to luxury sheers that complement your interior.',
    longDescription:
      'Beyond blinds, we offer a full range of custom drapery and architectural window coverings tailored to your space. Whether you are looking for privacy, thermal insulation, motorized curtain tracks, or grand floor-to-ceiling sheer elegance, our team crafts every drape to perfection.',
    icon: 'Frame',
    features: ['Custom Drapery & Sheers', 'Pinch-Pleat Curtains', 'Patio Door Treatments', 'Blackout Linings', 'Child-Safe Cordless Systems', 'Motorized Drapery Tracks'],
  },
  {
    id: 'motorized-shading',
    name: 'Smart Motorized Shading',
    category: 'AUTOMATION & MOTORIZATION',
    tagline: 'Effortless automated control at your fingertips.',
    image: '/assets/imgs/decore/IMG_0122.JPG.jpeg',
    description: 'Smart motorized blinds, automated solar shades, and architectural coverings integrated with remote, smartphone, and voice control.',
    longDescription:
      'Experience modern convenience with whisper-quiet motorized window treatments. From rechargeable battery-powered motors to integrated smart-home automation (Somfy, Lutron, Matter), control your blinds with the touch of a button or set automated schedules for privacy, thermal comfort, and energy savings.',
    icon: 'Sparkles',
    features: ['Somfy & Smart Home Sync', 'Rechargeable Cordless Motors', 'Handheld & Wall Remotes', 'Smartphone App Automation', 'Child & Pet Safe (100% Cordless)', 'Multi-Window Group Sync'],
    types: [
      {
        name: 'Automated Zebra & Roller Blinds',
        desc: 'Sleek motorized dual-layer zebra and roller shades offering one-touch transitions between light filtering and complete privacy.',
        image: '/assets/imgs/decore/IMG_0122.JPG.jpeg'
      },
      {
        name: 'Sunroom & Solarium Shading',
        desc: 'Engineered multi-panel solar shades designed specifically for cathedral sunrooms, conservatories, and large panoramic architectural glass.',
        image: '/assets/imgs/decore/IMG_0054.JPG.jpeg'
      },
      {
        name: 'Commercial & Executive Blinds',
        desc: 'Heavy-duty architectural window systems engineered for boardrooms, meeting pavilions, and corporate office developments.',
        image: '/assets/imgs/decore/IMG_0055.JPG.jpeg'
      },
      {
        name: 'Natural Woven Texture Shades',
        desc: 'Artisanal organic bamboo and woven wood roller shades delivering organic warmth, rich grain texture, and soft daylight diffusion.',
        image: '/assets/imgs/decore/IMG_0123.JPG.jpeg'
      }
    ]
  },
  {
    id: 'flooring',
    name: 'Flooring Decor',
    category: 'FLOORING SURFACES',
    tagline: 'Refined textures. Enduring architectural foundations.',
    image: '/assets/imgs/products/hardwood-flooring.jpg',
    description: 'Curated premium flooring surfaces — rich hardwood, resilient laminate, waterproof luxury vinyl plank, and modular carpet tile collections.',
    longDescription:
      'The right flooring establishes the tone, warmth, and character of every room. We supply a curated portfolio of Canadian-climate rated flooring materials selected for lasting durability, scratch resistance, and refined aesthetics. From natural solid oak hardwood to high-traffic waterproof vinyl plank and acoustic carpet tiles, we help you find the ideal surface for your home.',
    icon: 'Grid',
    features: ['Solid & Engineered Hardwood', 'High-Density Laminate', '100% Waterproof Vinyl Plank (LVP)', 'Modular Acoustic Carpet Tile', 'Canadian Climate Rated', 'Sample Viewing in Your Space'],
    types: [
      {
        name: 'Hardwood Flooring',
        desc: 'Rich solid and engineered hardwood timber planks, precision milled for natural grain warmth and long-lasting durability.',
        image: '/assets/imgs/products/hardwood-flooring.jpg'
      },
      {
        name: 'Laminate Flooring',
        desc: 'High-density scratch-resistant laminate flooring replicating real timber aesthetics with effortless maintenance and water resilience.',
        image: '/assets/imgs/products/laminate-flooring.jpg'
      },
      {
        name: 'Luxury Vinyl Plank (LVP)',
        desc: '100% waterproof luxury vinyl plank flooring engineered for high-traffic family zones, basements, kitchens, and moisture-prone areas.',
        image: '/assets/imgs/products/vinyl-plank.jpg'
      },
      {
        name: 'Engineered Chevron Parquet',
        desc: 'Artisanal chevron and herringbone hardwood flooring delivering architectural sophistication and timeless prestige.',
        image: '/assets/imgs/products/engineered-hardwood.jpg'
      },
      {
        name: 'Carpet Tile & Textures',
        desc: 'Modular, comfortable carpet tiles providing soft underfoot warmth, acoustic insulation, and simple individual tile stain replacement.',
        image: '/assets/imgs/products/carpet-tile.jpg'
      }
    ]
  },
  {
    id: 'measurement',
    name: 'Free Site Measurement',
    category: 'SITE CONCIERGE',
    tagline: 'Zero cost. Guaranteed precision.',
    image: '/assets/imgs/portfolio/project-1.jpg',
    description: 'Complimentary on-site measurement for accurate quotes and a perfect fit, every single time.',
    longDescription:
      'Accurate measurement is the foundation of every great installation. We visit your home at no charge, take precise measurements of every window and floor area, and use these to provide you with an accurate, no-surprise quote. This service is completely free with no obligation.',
    icon: 'Ruler',
    features: ['No-Charge Service', 'Professional Measurement Tools', 'Accurate Quoting', 'No Obligation', 'Same-Day Quote Available', 'All of Saskatoon & Area'],
  },
  {
    id: 'consultation',
    name: 'Design Consultation',
    category: 'ATELIER ADVISORY',
    tagline: 'Personalized interior guidance in your space.',
    image: '/assets/imgs/about/showroom-saskatoon.jpg',
    description: 'Expert guidance to help you choose products that align with your vision, your home, and your lifestyle.',
    longDescription:
      'Not sure where to start? Our team brings samples directly to your home so you can see exactly how products will look in your actual space with your actual lighting. We offer honest, no-pressure advice tailored to your needs and budget.',
    icon: 'Lightbulb',
    features: ['In-Home Sample Viewing', 'Product Recommendations', 'Style Guidance', 'Budget Planning', 'Light & Privacy Advice', 'No-Pressure Approach'],
  },
];

export const processSteps = [
  { step: '01', title: 'Contact Us', description: 'Reach out by phone, email, or our online form to get started with your project.' },
  { step: '02', title: 'Free Site Measurement', description: 'We visit your home at no charge and take precise measurements of every window and floor area.' },
  { step: '03', title: 'Understand Your Needs', description: 'We listen carefully to your preferences, lifestyle, and budget to find the perfect solution.' },
  { step: '04', title: 'Product Recommendation', description: 'We present a curated selection of products that work beautifully in your specific space.' },
  { step: '05', title: 'Confirm Selection', description: 'You review samples and colours in your own home, make your choices, and we finalize the order.' },
  { step: '06', title: 'Professional Installation', description: 'Our skilled team installs everything with precision, care, and zero mess left behind.' },
  { step: '07', title: 'Project Complete', description: 'Enjoy your beautifully transformed home, backed by our 1-year workmanship warranty.' },
];
