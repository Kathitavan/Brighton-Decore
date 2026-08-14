# Brighton Decor Canada ✦ 3D Architectural Visualizer & Digital Showroom

> **Developed with Excellence by [Kathiravan.org](https://kathiravan.org)**

An immersive, high-end 3D WebGL digital showroom and web application engineered for **Brighton Decor Ltd** (Saskatoon, Saskatchewan, Canada). Built with **React**, **React Three Fiber**, **Three.js**, **Framer Motion**, and **Tailwind CSS**.

---

## 🌟 Key Highlights & Feature Suite

### 1. 🏢 Photorealistic 3D Architectural Window & Drapery Studio
- **Procedural S-Fold Drapery Geometry**: Mathematically sculpted vertical S-fold cloth mesh with dynamic vertex gather compression and airflow breeze animations in `useFrame`.
- **Double Glazing & Architectural Frame**: Custom window casing, quartz sill reflections, and dual-pane insulated glass with realistic `transmission={0.94}` and index of refraction (`ior={1.52}`).
- **Venetian Blind Slat Physics**: Real-time X-axis slat rotation physics casting dynamic sunlit slat shadows across interior floor surfaces.
- **Lighting Atmosphere Modes**: Real-time toggle between **Bright Daylight** and **Warm Evening** sun streams.

### 2. 🛋️ Interactive 3D Room Studio (`/room-viewer`)
- **Virtual Room Visualizer**: Customize room presets, blind types, wall tones, flooring materials, and furniture styles in an interactive 3D WebGL environment.
- **Mobile Responsive Drawer Controls**: Dedicated touch-optimized bottom sheet controls for mobile devices and side inspector drawer for desktop displays.

### 3. 🎨 Multi-Page Visual Identity System (Zero Theme Bleed)
- **Page-Scoped Theme Architecture**: Each page operates with its own distinct visual theme and atmosphere:
  - **Home**: Dark Obsidian Luxury (`#0A0908`)
  - **Services**: Deep Architectural Slate (`#0B0E14`)
  - **Portfolio**: Gallery Noir Charcoal (`#0F1012`)
  - **Products**: Warm Sand Dune Showroom (`#F5F0E6`)
  - **3D Room Studio**: Deep Space WebGL Studio (`#030304`)
  - **Design Ideas / Blog**: Publisher's Cream Paper (`#FBF9F4`)
  - **Contact**: Forest Emerald Concierge (`#0A120E`)
  - **About**: Sandstone Heritage (`#1F1A14`)
- **Dynamic Route-Aware Header & Footer**: `Navbar.jsx` and `Footer.jsx` automatically adapt frosted glass backgrounds, link contrast, and button variants based on the active URL path.

### 4. 🎴 Spring-Assisted 3D Perspective Card Tilt Physics
- **Interactive Product Cards**: Framer Motion `useMotionValue` and `useSpring` tracking cursor coordinates for subtle perspective rotation (clamped to max ±4°).
- **Specular Sheen Overlay**: Dynamic light beam sweeping across card surfaces on hover.
- **Material Finish Selector Swatches**: Interactive finish swatches updating product previews in real time.

---

## 🛠️ Technology Stack

| Domain | Technology |
| :--- | :--- |
| **Core Framework** | React 18, Vite |
| **3D Engine** | React Three Fiber (R3F), Three.js, `@react-three/drei` |
| **Motion & Animation** | Framer Motion |
| **Styling System** | Tailwind CSS, CSS Modules |
| **Iconography** | Lucide React |
| **Color Management** | sRGB Color Space, Modern Tone Mapping |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Kathitavan/Brighton-Decore.git

# Navigate into the project directory
cd "Brighton decor"

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Compile production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 💻 Developed By

Designed and engineered by **[Kathiravan.org](https://kathiravan.org)** — Creative WebGL Development & Frontend Architecture.

---

© 2026 **Brighton Decor Ltd**. All Rights Reserved. Saskatoon, Saskatchewan, Canada.
