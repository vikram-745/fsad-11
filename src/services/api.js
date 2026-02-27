const STORAGE_KEY = 'classicStaysHomestays';

const seedHomestays = [
  {
    id: 1,
    name: 'Tea Valley Cottage',
    location: 'Munnar, Kerala',
    description: 'Hill-view wooden cottage with homemade Kerala meals.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    name: 'Sunset Haveli',
    location: 'Jaipur, Rajasthan',
    description: 'Heritage homestay near old city markets and forts.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    name: 'Backwater Nest',
    location: 'Alleppey, Kerala',
    description: 'Canal-side stay with canoe tours and seafood specials.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    name: 'Coastal Courtyard',
    location: 'Pondicherry',
    description: 'French-style home close to beach promenade and cafes.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80'
  }
];

const getStoredHomestays = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedHomestays));
    return [...seedHomestays];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...seedHomestays];
  } catch {
    return [...seedHomestays];
  }
};

const setStoredHomestays = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event('classicStaysHomestaysUpdated'));
};

const attractionsByHomestay = {
  1: [
    { name: 'Eravikulam National Park', distance: '11 km', tip: 'Best for early-morning wildlife views.' },
    { name: 'Mattupetty Dam', distance: '9 km', tip: 'Ideal for boating at sunset.' }
  ],
  2: [
    { name: 'Amber Fort', distance: '5 km', tip: 'Take guided tours for historical context.' },
    { name: 'Hawa Mahal', distance: '3 km', tip: 'Visit before 10 AM to avoid crowds.' }
  ],
  3: [
    { name: 'Alleppey Beach', distance: '4 km', tip: 'Great for evening local food stalls.' },
    { name: 'Kuttanad Backwaters', distance: '7 km', tip: 'Book local canoe rides for narrow canals.' }
  ],
  4: [
    { name: 'Promenade Beach', distance: '2 km', tip: 'Perfect for sunrise walks.' },
    { name: 'Auroville', distance: '12 km', tip: 'Visit Matrimandir with prior online pass.' }
  ]
};

export const getAttractionsByHomestay = (id) => attractionsByHomestay[id] || [];

export const recommendations = [
  'Stay near local markets for better cultural experiences.',
  'Ask hosts for hidden food spots and seasonal events.',
  'Pick weekday check-ins for quieter tourist attractions.'
];

export const guideTips = [
  { title: 'Street Food Trails', note: 'Try guided evening walks for authentic cuisine.' },
  { title: 'Local Festival Calendar', note: 'Check temple and town festival dates before travel.' },
  { title: 'Eco-friendly Travel', note: 'Prefer shared local transport for remote viewpoints.' }
];

export const api = {
  async getHomestays() {
    return Promise.resolve(getStoredHomestays());
  },
  async getHomestayById(id) {
    return Promise.resolve(getStoredHomestays().find((h) => h.id === Number(id)));
  },
  async getNearbyAttractions(homestayId) {
    return Promise.resolve(getAttractionsByHomestay(Number(homestayId)));
  },
  async addHomestay(payload, hostEmail) {
    const current = getStoredHomestays();
    const nextId = current.length ? Math.max(...current.map((item) => item.id)) + 1 : 1;
    const listing = {
      id: nextId,
      name: payload.name,
      location: payload.location,
      description: payload.description,
      price: Number(payload.price),
      image: payload.image,
      hostEmail
    };
    const updated = [...current, listing];
    setStoredHomestays(updated);
    return Promise.resolve(listing);
  },
  async getHostHomestays(hostEmail) {
    const current = getStoredHomestays();
    return Promise.resolve(current.filter((item) => item.hostEmail === hostEmail));
  }
};

export const homestays = seedHomestays;
export const featuredHomestays = seedHomestays.slice(0, 3);
