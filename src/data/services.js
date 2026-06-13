export const services = [
  {
    id: 1,
    name: "Interior Design Consultation",
    description: "Expert advice tailored to your space, lifestyle, and aesthetic preferences. We guide you through the initial creative process.",
    longDescription: "Our consultation phase involves deep-diving into your vision, functional requirements, and budget. We provide mood boards, initial sketches, and material suggestions to set the right direction for your project.",
    icon: "Layout"
  },
  {
    id: 2,
    name: "Full Home Design",
    description: "End-to-end interior solutions for your entire home, from concept to handover. Total transformation of living spaces.",
    longDescription: "Our comprehensive home design service covers everything from flooring and false ceilings to furniture selection and decor. We ensure a cohesive design language throughout your residence, reflecting your personality in every room.",
    icon: "Home"
  },
  {
    id: 3,
    name: "Modular Kitchen Design",
    description: "Functional and stylish kitchens utilizing international quality standards and ergonomic spatial planning.",
    longDescription: "We specialize in high-performance modular kitchens that combine sleek European aesthetics with robust Indian usage patterns. Featuring soft-close hardware, anti-fingerprint surfaces, and smart storage solutions.",
    icon: "ChefHat"
  },
  {
    id: 4,
    name: "Bathroom & Wet Areas",
    description: "Luxe bathroom designs focusing on premium fixtures, waterproofing excellence, and spa-like ambiance.",
    longDescription: "Transforming your bathroom into a sanctuary. We focus on ergonomic layouts, anti-skid premium tiling, moisture-resistant materials, and the latest in automated sanitaryware and shower systems.",
    icon: "ShowerHead"
  },
  {
    id: 5,
    name: "Commercial Spaces",
    description: "Office, retail, and hospitality interiors designed to boost productivity and enhance brand identity.",
    longDescription: "Our commercial designs prioritize acoustic performance, lighting hierarchy, and efficient workflow. Whether it's a high-energy tech office or a boutique luxury showroom, we design for business success.",
    icon: "Briefcase"
  },
  {
    id: 6,
    name: "3D Visualization & Walkthrough",
    description: "Photorealistic 3D renders and virtual walkthroughs to help you visualize your space before execution begins.",
    longDescription: "Leveraging cutting-edge rendering technologies, we provide you with a 'digital twin' of your proposed interior. This minimizes surprises during execution and allows for informed decisions on colors and textures.",
    icon: "Move3d"
  }
];

export const processSteps = [
  { step: "01", title: "Consultation", description: "Initial meeting to understand your vision, requirements, and budget." },
  { step: "02", title: "Concept Design", description: "Developing mood boards, floor plans, and initial 3D sketches." },
  { step: "03", title: "Material Selection", description: "Choosing the exact fabrics, finishes, and fixtures for your project." },
  { step: "04", title: "Execution", description: "On-site work managed by our project supervisors with strict quality checks." },
  { step: "05", title: "Handover", description: "Final reveal of your dream space, ready for you to move in." }
];

export const pricingPackages = [
  {
    name: "Starter",
    price: "₹89,000",
    features: ["Single Room Design", "3D Renders (2 views)", "Material Moodboard", "Basic Furniture Layout", "1 Revision cycle"],
    isPopular: false
  },
  {
    name: "Premium",
    price: "₹2,49,000",
    features: ["3BHK Apartment Package", "Full 3D Walkthrough", "Lighting Design", "Electrical & Plumbing Layout", "2 Revision cycles", "Execution Supervision"],
    isPopular: true
  },
  {
    name: "Luxury",
    price: "₹5,99,000+",
    features: ["Custom Villa Package", "Bespoke Furniture Design", "Smart Home Integration", "International Material Sourcing", "Unlimited Revisions", "Dedicated Project Manager"],
    isPopular: false
  }
];
