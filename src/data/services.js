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
    image: '/assets/imgs/products/zebra-blinds.jpg',
    description: 'Complete window solutions — from soft curtain treatments to custom-fitted coverings that complement your interior.',
    longDescription:
      'Beyond blinds, we offer a full range of window covering solutions designed to complement your space and lifestyle. Whether you are looking for privacy, light control, insulation, or purely aesthetic enhancement, our team will guide you to the right solution.',
    icon: 'Frame',
    features: ['Custom Curtains', 'Sheer Panels', 'Blackout Options', 'Day & Night Solutions', 'Child-Safe Mechanisms', 'Motorized Options'],
  },
  {
    id: 'flooring',
    name: 'Flooring',
    category: 'FLOORING SOLUTIONS',
    tagline: 'Hardwood, laminate, vinyl & carpet tile.',
    image: '/assets/imgs/products/hardwood-flooring.jpg',
    description: 'Hardwood, laminate, vinyl plank, and carpet tile — expertly selected for Canadian homes.',
    longDescription:
      'We offer a curated selection of flooring options suitable for Canadian climate conditions. Explore our premium hardwood, durable laminate, 100% waterproof vinyl plank (LVP), and versatile carpet tiles tailored to elevate any interior.',
    icon: 'Grid',
    features: ['Hardwood Flooring', 'Laminate Flooring', 'Vinyl Plank (LVP)', 'Carpet Tile'],
    types: [
      {
        name: 'Hardwood',
        desc: 'Rich solid and engineered hardwood timber planks, precision milled for natural grain warmth and long-lasting durability.',
        image: '/assets/imgs/products/hardwood-flooring.jpg'
      },
      {
        name: 'Laminate',
        desc: 'High-density scratch-resistant laminate flooring replicating real timber aesthetics with effortless maintenance and water resilience.',
        image: '/assets/imgs/products/laminate-flooring.jpg'
      },
      {
        name: 'Vinyl Plank',
        desc: '100% waterproof luxury vinyl plank flooring engineered for high-traffic family zones, basements, kitchens, and moisture-prone areas.',
        image: '/assets/imgs/products/vinyl-plank.jpg'
      },
      {
        name: 'Carpet Tile',
        desc: 'Modular, comfortable carpet tiles providing soft underfoot warmth, acoustic insulation, and simple individual tile stain replacement.',
        image: '/assets/imgs/products/engineered-hardwood.jpg'
      }
    ]
  },
  {
    id: 'flooring-installation',
    name: 'Flooring Installation',
    category: 'CRAFT & INSTALLATION',
    tagline: 'Precision fitted for Canadian homes.',
    image: '/assets/imgs/products/engineered-hardwood.jpg',
    description: 'Professional flooring installation by trained technicians — precise, clean, and built to last.',
    longDescription:
      'Our installation teams are trained professionals who take pride in their workmanship. We prepare subfloors correctly, follow manufacturer specifications, and ensure every installation is level, secure, and beautifully finished. We clean up thoroughly before we leave.',
    icon: 'Hammer',
    features: ['Subfloor Preparation', 'All Flooring Types', 'Furniture Moving', 'Trim & Baseboard Finishing', 'Clean-Up Included', '1-Year Workmanship Warranty'],
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
