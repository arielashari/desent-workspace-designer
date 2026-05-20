export type Category = 'desk' | 'chair' | 'accessory';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number; // per week
  category: Category;
  emoji: string;
  image?: string;
  sceneColor?: string;
}

export const DESKS: Product[] = [
  {
    id: 'desk-electric',
    name: 'Electric Standing Desk',
    tagline: 'Electric height 70–118 cm. Quiet motor. 3 sizes.',
    price: 14,
    category: 'desk',
    emoji: '📐',
    image: 'https://strapi.monis.rent/uploads/desk_titel_new_3db151d44c.jpg',
    sceneColor: '#B8B8C8',
  },
  {
    id: 'desk-mechanical',
    name: 'Mechanical Standing Desk',
    tagline: 'Manual height 70–120 cm. No electricity needed.',
    price: 10,
    category: 'desk',
    emoji: '🪵',
    image: 'https://strapi.monis.rent/uploads/Mechanical_Adjustable_Desk_front_new_a83b8077b0.jpg',
    sceneColor: '#C8A070',
  },
];

export const CHAIRS: Product[] = [
  {
    id: 'chair-ergonomic',
    name: 'Ergonomic Office Chair',
    tagline: 'Mesh back, 4D armrests, lumbar support. All-day comfort.',
    price: 8,
    category: 'chair',
    emoji: '💺',
    image: 'https://strapi.monis.rent/uploads/fantech_oca259s_chair_6_b632a0c529.jpg',
    sceneColor: '#6B7280',
  },
  {
    id: 'chair-basic',
    name: 'Basic Office Chair',
    tagline: 'Simple, solid. Good for shorter sessions.',
    price: 4,
    category: 'chair',
    emoji: '🪑',
    sceneColor: '#8B7355',
  },
];

export const ACCESSORIES: Product[] = [
  {
    id: 'acc-monitor-24',
    name: '24" Full HD Monitor',
    tagline: 'Xiaomi 24" IPS, 100 Hz, 99% sRGB.',
    price: 5,
    category: 'accessory',
    emoji: '🖥️',
    image: 'https://strapi.monis.rent/uploads/24_full_HD_office_monitor_a24i_2026_be9e6bf958.jpg',
  },
  {
    id: 'acc-monitor-27',
    name: '27" 4K Monitor',
    tagline: 'Redmi 27" 4K, USB-C, HDR, IPS. Crystal clear.',
    price: 10,
    category: 'accessory',
    emoji: '🖥️',
  },
  {
    id: 'acc-keyboard',
    name: 'Logitech MX Keys',
    tagline: 'Wireless, multi-device, 5-month battery.',
    price: 3,
    category: 'accessory',
    emoji: '⌨️',
    image: 'https://strapi.monis.rent/uploads/Logitech_MX_keys_1_9977480ae1.jpg',
  },
  {
    id: 'acc-mouse',
    name: 'Logitech MX Master S3',
    tagline: 'Ergonomic wireless. Tracks on any surface.',
    price: 3,
    category: 'accessory',
    emoji: '🖱️',
    image: 'https://strapi.monis.rent/uploads/Logitech_S3_6_4cf1e523b8.jpg',
  },
  {
    id: 'acc-lamp',
    name: 'LED Desk Lamp',
    tagline: 'Warm light for late nights.',
    price: 2,
    category: 'accessory',
    emoji: '💡',
  },
  {
    id: 'acc-plant',
    name: 'Desk Plant',
    tagline: 'A little green for your screen.',
    price: 1,
    category: 'accessory',
    emoji: '🌿',
  },
];

export interface Zone {
  id: string;
  name: string;
  tagline: string;
  price: number;
  emoji: string;
  color: string;
  items: string[];
}

export const ZONES: Zone[] = [
  {
    id: 'zone-coffee',
    name: 'Coffee Station',
    tagline: 'Nespresso machine + capsules. Wake up and ship.',
    price: 8,
    emoji: '☕',
    color: '#8B4513',
    items: ['Nespresso Machine', 'Capsule Pack'],
  },
  {
    id: 'zone-relax',
    name: 'Relax Zone',
    tagline: 'Bean bag + floor lamp. Decompress between sprints.',
    price: 6,
    emoji: '🛋️',
    color: '#2D7A7A',
    items: ['Bean Bag', 'Floor Lamp'],
  },
  {
    id: 'zone-fitness',
    name: 'Fitness Corner',
    tagline: 'Walking pad. Stay moving while you grind.',
    price: 15,
    emoji: '🏃',
    color: '#16A34A',
    items: ['Walking Pad'],
  },
  {
    id: 'zone-outdoor',
    name: 'Outdoor Bali',
    tagline: 'Hammock + side table. Work from the garden.',
    price: 5,
    emoji: '🌴',
    color: '#C85A3A',
    items: ['Hammock', 'Side Table'],
  },
];

export const ALL_PRODUCTS = [...DESKS, ...CHAIRS, ...ACCESSORIES];

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function calculateTotal(
  deskId: string,
  chairId: string,
  accessories: Set<string>,
): number {
  const desk = DESKS.find((d) => d.id === deskId);
  const chair = CHAIRS.find((c) => c.id === chairId);
  const accTotal = ACCESSORIES.filter((a) => accessories.has(a.id)).reduce(
    (sum, a) => sum + a.price,
    0,
  );
  return (desk?.price ?? 0) + (chair?.price ?? 0) + accTotal;
}
