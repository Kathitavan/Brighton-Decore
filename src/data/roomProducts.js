export const BLIND_PRODUCTS = [
  { id: 'roller',    name: 'Roller Blinds',          priceRange: '₹450–₹650/sqft', color: '#E8E0D4', shortDesc: 'Clean & minimalist, light filtering' },
  { id: 'zebra',     name: 'Zebra Blinds',            priceRange: '₹550–₹750/sqft', color: '#D4CFC8', shortDesc: 'Dual-layer alternating sheer strips' },
  { id: 'honeycomb', name: 'Honeycomb Blinds',        priceRange: '₹680–₹890/sqft', color: '#D4C8B0', shortDesc: 'Cellular insulation, energy saving' },
  { id: 'vertical',  name: 'Vertical Blinds',         priceRange: '₹380–₹580/sqft', color: '#C8C0B4', shortDesc: 'Ideal for large windows & doors' },
  { id: 'wooden',    name: 'Wooden / Faux Wood',      priceRange: '₹720–₹980/sqft', color: '#8B6914', shortDesc: 'Warm natural look, moisture resistant' },
  { id: 'pvc',       name: 'PVC Blinds',              priceRange: '₹320–₹520/sqft', color: '#F0F0F0', shortDesc: 'Waterproof, easy clean, durable' },
]

export const WALL_COLORS = [
  { label: 'Ivory',    hex: '#F5F0E8' }, { label: 'Warm Linen', hex: '#E8DCC8' },
  { label: 'Sand',     hex: '#D4C4A8' }, { label: 'Tan',        hex: '#B8A88A' },
  { label: 'Brown',    hex: '#8B7355' }, { label: 'Dark Wood',  hex: '#4A3728' },
  { label: 'Navy',     hex: '#2C3E50' }, { label: 'Midnight',   hex: '#1A1A2E' },
  { label: 'Forest',   hex: '#2D4A22' }, { label: 'Burgundy',   hex: '#4A2C2A' },
  { label: 'Gold',     hex: '#C9A55A' }, { label: 'Charcoal',   hex: '#0F0E0C' },
]

export const FLOOR_OPTIONS = [
  { label: 'Light Oak',   color: '#C8A882' },
  { label: 'Dark Walnut', color: '#4A3520' },
  { label: 'Marble',      color: '#E8E4E0' },
  { label: 'Concrete',    color: '#8A8A8A' },
  { label: 'Herringbone', color: '#B8986A' },
  { label: 'Dark Tile',   color: '#2A2A2A' },
]

export const roomProducts = {
  rooms: [
    { id: 'living', name: 'Living Room' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'dining', name: 'Dining Room' },
    { id: 'office', name: 'Office' }
  ],
  categories: {
    blinds: BLIND_PRODUCTS,
    wallColors: WALL_COLORS,
    flooring: FLOOR_OPTIONS,
    lighting: [
      { id: 'warm', name: 'Warm', color: '#FFF5E0', intensity: 0.6, pIntensity: 1.2, pColor: '#FFD700' },
      { id: 'cool', name: 'Cool', color: '#E0F0FF', intensity: 0.7, pIntensity: 1.0, pColor: '#B0D4FF' },
      { id: 'bright', name: 'Bright', color: '#FFFFFF', intensity: 1.0, pIntensity: 2.0, pColor: '#FFFFFF' },
      { id: 'dim', name: 'Dim', color: '#FF8C00', intensity: 0.3, pIntensity: 0.4, pColor: '#FF6B00' },
    ],
    rugs: [
        { id: 'none', name: 'None', color: 'transparent' },
        { id: 'ivory', name: 'Ivory', color: '#F5F0E8' },
        { id: 'rust', name: 'Rust', color: '#8B4513' },
        { id: 'navy', name: 'Navy', color: '#000080' },
        { id: 'charcoal', name: 'Charcoal', color: '#333333' }
    ]
  }
};
