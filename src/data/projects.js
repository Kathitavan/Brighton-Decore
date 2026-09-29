// src/data/projects.js
// Brighton Decor Canada — Architectural & Interior Portfolio Single Source of Truth
// Populated with authentic client completed project photography from public/assets/imgs/decore/

/**
 * @typedef {Object} ProjectStory
 * @property {string} brief - Initial client brief or requirements
 * @property {string} approach - Architectural and design approach taken
 * @property {string} materials - Materials and fixtures utilized
 * @property {string} result - Final outcome and customer experience
 */

/**
 * @typedef {Object} Project
 * @property {number|string} id - Unique project identifier
 * @property {string} slug - URL-friendly slug
 * @property {string} title - Project title / residence name
 * @property {string} category - Primary category (e.g. 'Residential', 'Window Coverings', 'Blinds')
 * @property {string[]} categories - Array of matching category tags for filtering
 * @property {string} type - Installation type subtitle
 * @property {string} city - Project location city & province
 * @property {string} country - Country ('Canada')
 * @property {string} [area] - Approximate square footage
 * @property {string} [completion] - Completion season / year
 * @property {string} description - Brief summary for grid cards
 * @property {string} longDescription - Detailed overview for modal showcase
 * @property {string} image - Primary high-resolution project cover photo
 * @property {string} [beforeImage] - Optional before photo for transformation slider
 * @property {string} [afterImage] - Optional after photo for transformation slider
 * @property {string[]} gallery - Array of gallery images for project detail modal
 * @property {string[]} services - List of services executed
 * @property {string[]} materials - Specific materials and brands installed
 * @property {boolean} [featured] - Whether highlighted as a featured flagship project
 * @property {ProjectStory} [story] - Editorial narrative breakdown
 */

/**
 * Original Client Projects Dataset
 * @type {Project[]}
 */
export const projects = [
  {
    id: 1,
    slug: 'aspen-ridge-grand-living-suite',
    title: 'The Aspen Ridge Living Suite',
    category: 'Window Coverings',
    categories: ['Residential', 'Window Coverings', 'Living Spaces'],
    type: 'Bespoke Custom Drapery & Architectural Sheers',
    city: 'Saskatoon, SK',
    country: 'Canada',
    area: '2,800 sq ft',
    completion: 'Fall 2024',
    description: 'Floor-to-ceiling tailored slate drapes with ambient sheer side panels framing an expansive living room with double chandeliers.',
    longDescription: 'A custom luxury living room installation designed to manage daylight and enhance intimacy in an open-concept space. The suite combines floor-to-ceiling slate blue pinch-pleat drapery with integrated architectural sheer panels, allowing gentle natural diffusion while providing total evening privacy.',
    image: '/assets/imgs/decore/IMG_0052.JPG.jpeg',
    gallery: [
      '/assets/imgs/decore/IMG_0052.JPG.jpeg',
      '/assets/imgs/decore/IMG_0057.JPG.jpeg',
    ],
    services: ['Custom Drapery Fabrication', 'Ceiling-Recessed Track Installation', 'Laser Measurement', 'In-Home Design Consultation'],
    materials: ['Belgian Slate Blend Fabric', 'High-R Sheer Voile', 'Heavy-Duty Silent Track Hardware'],
    featured: true,
    story: {
      brief: 'Homeowner required elegant full-height drapery to complement a dramatic cathedral living area with expansive glazing.',
      approach: 'Engineered custom pinch pleating hung from reinforced top tracks to deliver seamless folds without stacking bulk.',
      materials: 'Premium acoustic-softening slate fabric with UV-resistant sheer side filtration.',
      result: 'An elevated, hotel-grade living sanctuary with balanced acoustics and refined sunlight diffusion.',
    },
  },
  {
    id: 2,
    slug: 'willows-dual-aspect-suite',
    title: 'The Willows Dual-Aspect Suite',
    category: 'Blinds',
    categories: ['Residential', 'Blinds', 'Living Spaces'],
    type: 'Architectural Horizontal Blinds & Precision Casement Screens',
    city: 'Saskatoon, SK',
    country: 'Canada',
    area: '1,950 sq ft',
    completion: 'Summer 2024',
    description: 'Precision-measured crisp white architectural horizontal blinds fitted flush to dual-aspect corner windows.',
    longDescription: 'For this contemporary corner room, precise alignment was critical. We fitted laser-measured white horizontal architectural blinds with minimal gap tolerances, paired with integrated framed side casement screens for effortless ventilation.',
    image: '/assets/imgs/decore/IMG_0053.JPG.jpeg',
    gallery: [
      '/assets/imgs/decore/IMG_0053.JPG.jpeg',
    ],
    services: ['Flush Recess Installation', 'Corner Window Mitre Alignment', 'Laser Measurement'],
    materials: ['Engineered Architectural White Aluminum', 'Cordless Tilt Mechanism', 'Powder-Coated Headrail'],
    featured: false,
    story: {
      brief: 'Eliminate street-level glare in a prominent corner window while maintaining clean architectural lines.',
      approach: 'Manufactured custom headrails with precision corner clearances so blinds operate independently without friction.',
      materials: 'High-tensile scratch-resistant slats with sealed micro-bearings.',
      result: 'Clean, modern geometry that provides instantaneous tilt control over changing prairie sunlight angles.',
    },
  },
  {
    id: 3,
    slug: 'prairie-conservatory-solarium',
    title: 'Prairie Conservatory Solarium',
    category: 'Window Coverings',
    categories: ['Residential', 'Window Coverings', 'Commercial'],
    type: 'Multi-Panel Panoramic Solarium Solar Shading',
    city: 'Saskatoon, SK',
    country: 'Canada',
    area: '3,400 sq ft',
    completion: 'Winter 2024',
    description: 'Comprehensive thermal and glare-reducing roller shade installation across a soaring cathedral sunroom with skylight integration.',
    longDescription: 'Solariums face extreme prairie temperature swings — intense solar gain in summer and freezing temperatures in winter. We designed a multi-panel custom shading system covering all angled peripheral window panes to regulate room comfort year-round.',
    image: '/assets/imgs/decore/IMG_0054.JPG.jpeg',
    gallery: [
      '/assets/imgs/decore/IMG_0054.JPG.jpeg',
    ],
    services: ['Multi-Angle Solarium Engineering', 'Thermal Fabric Specification', 'Precision Installation'],
    materials: ['High-Performance Solar Screen 3% Openness', 'Thermally Reflective Backing', 'Heavy-Duty Tension Systems'],
    featured: true,
    story: {
      brief: 'Convert an overly bright, thermally erratic glass conservatory into a comfortable all-season dining pavilion.',
      approach: 'Custom templating for 8 multi-faceted glass panels and specialized retention brackets.',
      materials: 'Commercial-grade solar fabric that rejects 97% of UV rays while preserving outward panoramic views.',
      result: 'The sunroom is now an inviting, temperature-stabilized centerpiece for year-round family entertaining.',
    },
  },
  {
    id: 4,
    slug: 'river-landing-executive-boardroom',
    title: 'River Landing Executive Boardroom',
    category: 'Commercial',
    categories: ['Commercial', 'Blinds'],
    type: 'Commercial Architectural Venetian Window Systems',
    city: 'Saskatoon, SK',
    country: 'Canada',
    area: '4,200 sq ft',
    completion: 'Spring 2025',
    description: 'Uniform commercial-grade window blinds across 7 panoramic windows for an executive circular pavilion.',
    longDescription: 'Architectural window treatments for high-stakes corporate spaces require uniform aesthetics and durable mechanical performance. We furnished 7 expansive floor-to-ceiling windows with commercial horizontal blinds that eliminate digital screen glare during daytime presentations.',
    image: '/assets/imgs/decore/IMG_0055.JPG.jpeg',
    gallery: [
      '/assets/imgs/decore/IMG_0055.JPG.jpeg',
    ],
    services: ['Commercial Project Management', 'Multi-Window Uniformity Spec', 'Nighttime Installation'],
    materials: ['Heavy-Duty Commercial Gauge Slats', 'Commercial Wand Gearboxes', 'Flame-Retardant Hardware'],
    featured: false,
    story: {
      brief: 'Provide high-durability glare control across a circular panoramic boardroom without obstructing Saskatchewan skies.',
      approach: 'Coordinated batch fabrication to guarantee 100% color consistency and identical tilt angles across all 7 frames.',
      materials: 'Commercial architectural slat profile with matte anti-reflective finish.',
      result: 'Professional, pristine corporate atmosphere with immediate glare suppression for executive meetings.',
    },
  },
  {
    id: 5,
    slug: 'broadway-culinary-suite',
    title: 'The Broadway Culinary Suite',
    category: 'Kitchens',
    categories: ['Residential', 'Kitchens', 'Window Coverings'],
    type: 'Custom Tailored Roman Textured Shade',
    city: 'Saskatoon, SK',
    country: 'Canada',
    area: '1,600 sq ft',
    completion: 'Summer 2024',
    description: 'Precision-measured moisture-resilient textured fabric shade recessed flush above an artisan kitchen sink framed in custom millwork.',
    longDescription: 'Kitchen window treatments must balance humidity resistance with refined residential aesthetics. For this Broadway home, we crafted a tailored Roman-profile shade in an organic oatmeal texture that complements the brass fixtures and artisanal subway tile.',
    image: '/assets/imgs/decore/IMG_0056.JPG.jpeg',
    gallery: [
      '/assets/imgs/decore/IMG_0056.JPG.jpeg',
    ],
    services: ['Millwork Recess Templating', 'Cordless Safety Mechanism', 'In-Home Fabric Consultation'],
    materials: ['Moisture-Resistant Woven Linen Blend', 'Cordless Smooth-Lift System', 'Stain-Resistant Coating'],
    featured: false,
    story: {
      brief: 'A stylish kitchen sink window covering that resists cooking steam and splashes while providing quick privacy.',
      approach: 'Inside-mount fit with zero light leakage along the white casing and smooth one-touch cordless adjustment.',
      materials: 'Textured poly-linen weave treated with hydrophobic coating.',
      result: 'A warm, tactile focal point that elevates the modern kitchen work triangle.',
    },
  },
  {
    id: 6,
    slug: 'nutana-french-door-sanctuary',
    title: 'Nutana French Door Sanctuary',
    category: 'Window Coverings',
    categories: ['Residential', 'Window Coverings', 'Living Spaces'],
    type: 'Pinch-Pleat Tailored Drapes & Dual Transition Zebra Shades',
    city: 'Saskatoon, SK',
    country: 'Canada',
    area: '2,200 sq ft',
    completion: 'Fall 2024',
    description: 'Bespoke pinch-pleat tailored grey drapes framing French patio doors, complemented by matching zebra shades on flanking windows.',
    longDescription: 'Patio doors present a unique design challenge: high daily traffic combined with the need for privacy and draft protection. We designed custom pinch-pleat tailored drapery with discreet tie-backs framing the French doors, paired with charcoal zebra shades on adjacent windows for seamless light control.',
    image: '/assets/imgs/decore/IMG_0057.JPG.jpeg',
    gallery: [
      '/assets/imgs/decore/IMG_0057.JPG.jpeg',
      '/assets/imgs/decore/IMG_0122.JPG.jpeg',
    ],
    services: ['French Door Custom Templating', 'Patio Clear-Span Hardware', 'Laser Measurement'],
    materials: ['Architectural Grey Pinch-Pleat Fabric', 'Dual-Layer Zebra Translucent Fabric', 'Custom Tie-Back Hardware'],
    featured: true,
    story: {
      brief: 'Homeowner wanted a grand focal entrance to their garden patio without obstructing everyday door operation.',
      approach: 'Sized drapes to stack completely clear of door swings, complemented by precision-measured zebra blinds on side walls.',
      materials: 'Thermal-lined drapery with UV-stable synthetic woven accents.',
      result: 'A balanced, magazine-worthy entrance that insulates against cold winter drafts and frames outdoor views.',
    },
  },
  {
    id: 7,
    slug: 'rosewood-fireside-living-room',
    title: 'The Rosewood Fireside Living Room',
    category: 'Blinds',
    categories: ['Residential', 'Blinds', 'Living Spaces'],
    type: 'Coordinated Multi-Window Zebra Shading Suite',
    city: 'Saskatoon, SK',
    country: 'Canada',
    area: '2,600 sq ft',
    completion: 'Winter 2025',
    description: 'Sleek graphite zebra shades providing light-filtering and full privacy control across sliding patio doors and twin fireplace windows.',
    longDescription: 'A complete room coordination featuring matching graphite zebra shades across large sliding doors and two tall windows flanking a vertical fireplace wall. The dual-transition stripes offer infinite variations between gentle daylight filtering and solid privacy.',
    image: '/assets/imgs/decore/IMG_0122.JPG.jpeg',
    gallery: [
      '/assets/imgs/decore/IMG_0122.JPG.jpeg',
      '/assets/imgs/decore/IMG_0057.JPG.jpeg',
    ],
    services: ['Sliding Door Blinds Fitting', 'Dual-Window Alignment', 'Full-Room Window Consultation'],
    materials: ['Graphite Zebra Transition Fabric', 'Cassette Valance Housing', 'Smooth-Glide Roller Mechanism'],
    featured: true,
    story: {
      brief: 'Create a cohesive, modern window covering scheme across mismatched door and window openings in a contemporary living room.',
      approach: 'Custom cassette headrails in matching white trim profiles with coordinated horizontal band intervals.',
      materials: 'Dual-layer alternating woven bands engineered for easy cleaning and anti-static dust repellence.',
      result: 'Striking modern lines that accentuate the architectural fireplace while giving homeowners effortless light control.',
    },
  },
  {
    id: 8,
    slug: 'stonebridge-artisan-dining-suite',
    title: 'Stonebridge Dining Room',
    category: 'Blinds',
    categories: ['Residential', 'Blinds', 'Living Spaces'],
    type: 'Warm Textured Natural Woven Roller Shades',
    city: 'Saskatoon, SK',
    country: 'Canada',
    area: '2,100 sq ft',
    completion: 'Fall 2024',
    description: 'Triple-window natural amber woven roller shades harmonizing with handcrafted rustic timber furniture.',
    longDescription: 'Bringing natural warmth into Canadian dining rooms, these custom woven wood/bamboo roller shades filter daylight into a warm, golden ambiance while shielding diners from harsh direct sun during evening dinners.',
    image: '/assets/imgs/decore/IMG_0123.JPG.jpeg',
    gallery: [
      '/assets/imgs/decore/IMG_0123.JPG.jpeg',
    ],
    services: ['Triple-Window Alignment', 'Natural Material Consultation', 'Laser Measurement'],
    materials: ['Artisanal Amber Woven Wood Reed', 'Light-Filtering Backing', 'Compact Cassette System'],
    featured: false,
    story: {
      brief: 'Complement a custom timber dining suite with window treatments that feel organic, warm, and inviting.',
      approach: 'Inside-mount three matching shades across the primary window wall and flanking accent openings.',
      materials: 'Sustainably sourced natural woven reeds with durable edge-binding.',
      result: 'A warm, inviting dining space glowing with natural filtered prairie light.',
    },
  },
];

export const portfolioCategories = [
  'All',
  'Residential',
  'Window Coverings',
  'Blinds',
  'Living Spaces',
  'Kitchens',
  'Commercial',
];
