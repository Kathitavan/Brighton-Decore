export const projects = [
  {
    id: 1,
    title: "The Arora Residence",
    category: "Residential",
    city: "New Delhi",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000&sig=1",
    description: "A luxury 4BHK apartment designed with a fusion of modern aesthetics and traditional Indian patterns.",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000&sig=11",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000&sig=1",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000&sig=2",
      "https://images.unsplash.com/photo-1600566752355-35792ec3ad88?auto=format&fit=crop&q=80&w=1000&sig=3"
    ]
  },
  {
    id: 2,
    title: "Café Lune",
    category: "Commercial",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000&sig=4",
    description: "A chic, minimalist café interior that maximizes natural light and creates a cozy ambiance.",
    beforeImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000&sig=12",
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000&sig=4",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000&sig=5",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1000&sig=6"
    ]
  },
  {
    id: 3,
    title: "The Grand Vista Penthouse",
    category: "Luxury",
    city: "Bangalore",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1000&sig=7",
    description: "Ultra-luxury penthouse featuring bespoke furniture, floor-to-ceiling windows, and smart home automation.",
    beforeImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000&sig=13",
    gallery: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1000&sig=7",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000&sig=8",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1000&sig=9"
    ]
  },
  {
    id: 4,
    title: "Zenith Tech HQ",
    category: "Commercial",
    city: "Hyderabad",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1000&sig=10",
    description: "Modern office space designed to foster creativity and collaboration with ergonomic workstations.",
    beforeImage: "https://images.unsplash.com/photo-1517502884422-41eaadeff171?auto=format&fit=crop&q=80&w=1000&sig=14",
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1000&sig=10",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000&sig=11",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000&sig=12"
    ]
  },
  {
    id: 5,
    title: "The Oasis Retreat",
    category: "Hospitality",
    city: "Goa",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=1000&sig=13",
    description: "Boutique resort interiors focusing on organic materials and a tropical luxury aesthetic.",
    beforeImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000&sig=15",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=1000&sig=13",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000&sig=14",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1000&sig=15"
    ]
  }
];

// Generate 15 more mock projects to reach 20 as requested
for (let i = 6; i <= 20; i++) {
  projects.push({
    id: i,
    title: `Project ${["Avenue", "Suite", "Hills", "Villas", "Plaza", "Gardens"][i % 6]} ${i}`,
    category: ["Residential", "Commercial", "Luxury", "Hospitality"][i % 4],
    city: ["Pune", "Chennai", "Kolkata", "Ahmedabad", "Jaipur"][i % 5],
    image: `https://images.unsplash.com/photo-${1600000000000 + i * 123456}?auto=format&fit=crop&q=80&w=1000&sig=${i + 20}`,
    description: "A demonstration of Brighton Decore's commitment to quality and innovative design principles.",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000&sig=99",
    gallery: [
      `https://images.unsplash.com/photo-${1600000000000 + i * 123456}?auto=format&fit=crop&q=80&w=1000&sig=${i + 20}`,
      `https://images.unsplash.com/photo-${1600000000000 + i * 223456}?auto=format&fit=crop&q=80&w=1000&sig=${i + 40}`,
      `https://images.unsplash.com/photo-${1600000000000 + i * 323456}?auto=format&fit=crop&q=80&w=1000&sig=${i + 60}`
    ]
  });
}
