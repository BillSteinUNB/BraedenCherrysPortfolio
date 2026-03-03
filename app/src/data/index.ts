import type { Product, Service, GalleryItem, TeamMember, BusinessHours } from '@/types';

export const products: Product[] = [
  {
    id: 'pomade-1',
    name: 'Matte Clay Pomade',
    description: 'Strong hold, zero shine. Perfect for textured, natural looks.',
    price: 28,
    image: '/images/products/pomade.png',
    category: 'Pomades',
  },
  {
    id: 'beard-oil-1',
    name: 'Cedarwood Beard Oil',
    description: 'Nourishing blend with natural cedarwood scent.',
    price: 24,
    image: '/images/products/beard-oil.png',
    category: 'Beard',
  },
  {
    id: 'shampoo-1',
    name: 'Daily Wash Shampoo',
    description: 'Gentle cleanse for everyday use. Keeps hair fresh.',
    price: 22,
    image: '/images/products/shampoo.png',
    category: 'Hair Care',
  },
  {
    id: 'sea-salt-1',
    name: 'Sea Salt Spray',
    description: 'Beach texture and volume. Effortless style.',
    price: 18,
    image: '/images/products/sea-salt.png',
    category: 'Hair Care',
  },
];

export const services: Service[] = [
  {
    id: 'haircut',
    name: 'HAIRCUT',
    description: '45 minute appointment',
    price: 30,
  },
  {
    id: 'student-haircut',
    name: 'STUDENT HAIRCUT',
    description: '45 minute appointment',
    price: 25,
  },
  {
    id: 'buzzcut',
    name: 'BUZZCUT',
    description: '30 minute appointment',
    price: 25,
  },
  {
    id: 'beard-trim',
    name: 'BEARD TRIM',
    description: '30 minute appointment',
    price: 25,
  },
  {
    id: 'haircut-beard',
    name: 'HAIRCUT & BEARD TRIM',
    description: '1 hour appointment',
    price: 45,
  },
  {
    id: 'cleanup',
    name: 'CLEAN UP',
    description: '15 minute appointment (trimmer work and neck taper)',
    price: 15,
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'haircut-1',
    title: 'TEXTURED CURLS',
    image: '/images/gallery/haircut-1.png',
    category: 'Textured',
  },
  {
    id: 'haircut-2',
    title: 'MODERN QUIFF',
    image: '/images/gallery/haircut-2.png',
    category: 'Classic',
  },
  {
    id: 'haircut-3',
    title: 'SKIN FADE',
    image: '/images/gallery/haircut-3.png',
    category: 'Fades',
  },
  {
    id: 'haircut-4',
    title: 'CURLY TOP',
    image: '/images/gallery/haircut-4.png',
    category: 'Textured',
  },
  {
    id: 'haircut-5',
    title: 'BUZZ CUT',
    image: '/images/gallery/haircut-5.png',
    category: 'Classic',
  },
  {
    id: 'haircut-6',
    title: 'BOLD COLOR',
    image: '/images/gallery/haircut-6.png',
    category: 'Creative',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'braeden',
    name: 'BRAEDEN',
    role: 'Founder',
    specialty: 'Master barber',
    image: '/images/team/mike.jpg',
  },
];

export const businessHours: BusinessHours[] = [
  { day: 'Monday', hours: '10:00 AM - 6:00 PM', isOpen: true },
  { day: 'Tuesday', hours: '10:00 AM - 6:00 PM', isOpen: true },
  { day: 'Wednesday', hours: '10:00 AM - 6:00 PM', isOpen: true },
  { day: 'Thursday', hours: '10:00 AM - 6:00 PM', isOpen: true },
  { day: 'Friday', hours: '10:00 AM - 6:00 PM', isOpen: true },
  { day: 'Saturday', hours: '10:00 AM - 6:00 PM', isOpen: true },
  { day: 'Sunday', hours: 'CLOSED', isOpen: false },
];

export const businessInfo = {
  name: "Cherry's Barbershop",
  address: '323 St George St',
  city: 'Moncton NB',
  country: 'Canada',
  phone: '(639) 414-2877',
  email: 'braeden@cherrysbarber.com',
  instagram: 'https://instagram.com/brae.blades',
  bookingUrl: 'https://www.vagaro.com/cherrysbarber',
};
