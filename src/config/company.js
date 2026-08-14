/**
 * Brighton Decor Ltd — Canada Client Configuration
 * Central source of truth for all Canada business information.
 * DO NOT mix with India/Bangalore client data.
 */

export const company = {
  name: 'Brighton Decor Ltd',
  logo: '/assets/imgs/main logo.png',
  tagline: 'Brightening Your Home. Defining Your Space.',
  taglineShort: 'Brightening Your Home.',
  description:
    'Thoughtfully selected interiors, expertly installed. From refined window coverings to beautifully finished floors, Brighton Decor helps Canadian homes feel considered from every angle.',
  established: 2022,
  businessType: 'Proprietorship',

  // Contact
  phone: '+1 (306) 580-6476',
  phoneRaw: '13065806476',
  email: 'Shoieb@brightondecor.co',
  whatsapp: '13065806476',

  // Address
  address: {
    street: '2911B Cleveland Avenue',
    city: 'Saskatoon',
    province: 'Saskatchewan',
    country: 'Canada',
    full: '2911B Cleveland Avenue, Saskatoon, Saskatchewan, Canada',
    short: 'Saskatoon, SK',
  },

  // Hours
  hours: {
    weekdays: 'Monday – Friday',
    time: '9:00 AM – 5:00 PM CST',
    closed: 'Saturday & Sunday',
  },

  // Maps
  googleMapsUrl: 'https://maps.app.goo.gl/5iuFnetoc1zvR1oF7',
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2454.8!2d-106.6346!3d52.1332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDA3JzU5LjUiTiAxMDbCsDM4JzA0LjYiVw!5e0!3m2!1sen!2sca!4v1697000000000!5m2!1sen!2sca',

  // Social — update with verified client handle
  social: {
    instagram: 'https://www.instagram.com/brightondecor/',
    facebook: '',
    linkedin: '',
  },

  // Service area
  serviceArea: 'All across Canada',
  primaryCity: 'Saskatoon, Saskatchewan',

  // Trust statistics
  stats: {
    homes: '1,300+',
    years: '4+',
    satisfaction: '100%',
    warranty: '1 Year',
  },
};

// Services offered by the Canada client
export const canadaServices = [
  {
    id: 'blinds',
    name: 'Window Blinds',
    shortDesc: 'Premium blinds in every style — roller, zebra, honeycomb, vertical, wooden, and PVC.',
    icon: 'Layers',
    path: '/services#blinds',
  },
  {
    id: 'window-coverings',
    name: 'Window Coverings',
    shortDesc: 'Complete window solutions including curtains and custom treatments for any space.',
    icon: 'Frame',
    path: '/services#window-coverings',
  },
  {
    id: 'flooring-supply',
    name: 'Flooring Supply',
    shortDesc: 'Quality flooring materials sourced to match your style, budget, and lifestyle.',
    icon: 'Grid',
    path: '/services#flooring',
  },
  {
    id: 'flooring-installation',
    name: 'Flooring Installation',
    shortDesc: 'Professional installation by trained technicians — precise, clean, and lasting.',
    icon: 'Hammer',
    path: '/services#installation',
  },
  {
    id: 'measurement',
    name: 'Free Site Measurement',
    shortDesc: 'Complimentary on-site measurement for accurate quotes and perfect fit every time.',
    icon: 'Ruler',
    path: '/services#measurement',
  },
  {
    id: 'consultation',
    name: 'Design Consultation',
    shortDesc: 'Expert guidance to help you choose products that match your vision and your home.',
    icon: 'Lightbulb',
    path: '/services#consultation',
  },
];

// Customer journey steps
export const processSteps = [
  { step: '01', title: 'Contact Us', description: 'Reach out by phone, email, or our online form to get started.' },
  { step: '02', title: 'Free Site Measurement', description: 'We visit your home at no charge and take precise measurements of every window and floor area.' },
  { step: '03', title: 'Understand Your Needs', description: 'We listen carefully to your preferences, lifestyle, and budget to understand exactly what you need.' },
  { step: '04', title: 'Product Recommendation', description: 'We present a curated selection of products that suit your space perfectly.' },
  { step: '05', title: 'Confirm Selection', description: 'You review samples, make your final choices, and we confirm the order details.' },
  { step: '06', title: 'Professional Installation', description: 'Our skilled team installs everything with precision, care, and zero mess.' },
  { step: '07', title: 'Project Complete', description: 'You enjoy your beautifully transformed home, backed by our 1-year warranty.' },
];

// FAQ for Canada
export const faqItems = [
  {
    q: 'Do you offer a free site measurement?',
    a: 'Yes — all site measurements are completely complimentary. We visit your home, take precise measurements, and provide a detailed quote at no cost.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We are based in Saskatoon, Saskatchewan, and serve customers across Canada.',
  },
  {
    q: 'How long does installation take?',
    a: 'Most residential installations are completed within a day. Larger projects may take longer — we will give you a clear timeline upfront.',
  },
  {
    q: 'Do you display prices on the website?',
    a: 'We prefer to provide accurate quotes based on your specific measurements and product choices. Contact us for a free, no-obligation quote.',
  },
  {
    q: 'What warranty do you offer?',
    a: 'All our installations come with a 1-year warranty on workmanship. Product manufacturer warranties may also apply.',
  },
  {
    q: 'Can I try blinds in a 3D room before ordering?',
    a: 'Yes! Our 3D Room Studio lets you visualize different blind styles, wall colours, and flooring options in a virtual room before making any decisions.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cash, bank transfer, credit/debit cards, cheque, and EMI options.',
  },
  {
    q: 'Do you supply and install flooring as well?',
    a: 'Absolutely. We supply quality flooring materials and provide full professional installation services.',
  },
];
