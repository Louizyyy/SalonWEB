export const services = [
  {
    name: "Cut & Style",
    category: "hair",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=650&q=80",
    alt: "Stylist creating a salon hairstyle",
    tag: "THE SIGNATURE",
    description: "A fresh shape, a soft finish, a look that is entirely yours.",
    price: "From \u20b1650 \u00b7 60 min",
  },
  {
    name: "Color & Dimension",
    category: "hair",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=650&q=80",
    alt: "Warm dimensional curly hair",
    tag: "YOUR NEXT ERA",
    description: "Rich tones and sun-kissed ribbons for a luminous finish.",
    price: "From \u20b12,500 \u00b7 180 min",
  },
  {
    name: "Nail Rituals",
    category: "nails",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=650&q=80",
    alt: "Carefully styled manicured nails",
    tag: "THE FINISHING TOUCH",
    description: "Beautifully shaped, perfectly polished, down to the detail.",
    price: "From \u20b1450 \u00b7 60 min",
  },
  {
    name: "Makeup Artistry",
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=650&q=80",
    alt: "Beauty products and brushes for makeup artistry",
    tag: "A LITTLE EXTRA GLOW",
    description: "Soft radiance or full occasion glam. Your moment, your look.",
    price: "From \u20b11,500 \u00b7 90 min",
  },
] as const;
export const serviceNames = [
  ...services.map((s) => s.name),
  "The Self-Care Duo",
];
export const timeOptions = [
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
];
