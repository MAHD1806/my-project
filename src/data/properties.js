// Property data. Shaped like database records so it can later be replaced by an API call.
// Images are Unsplash photo ids; use img(id, width) to build URLs.

export const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const srcSet = (id, widths = [480, 800, 1200]) =>
  widths.map((w) => `${img(id, w)} ${w}w`).join(', ');

export const HERO_IMAGE = '1600585154340-be6161a56a0c';
export const ABOUT_IMAGES = ['1564013799919-ab600027ffc6', '1580587771525-78b9dba3b914'];
export const SERVICES_IMAGE = '1613977257363-707ba9348227';

const EXTERIORS = [
  '1613490493576-7fde63acd811', '1600596542815-ffad4c1539a9', '1600585154340-be6161a56a0c', '1512917774080-9991f1c4c750',
  '1564013799919-ab600027ffc6', '1580587771525-78b9dba3b914', '1600566753190-17f0baa2a6c3', '1600047509807-ba8f99d2cdde',
  '1523217582562-09d0def993a6', '1613977257363-707ba9348227',
];
const INTERIORS = ['1600607687939-ce8a6c25118c', '1600573472550-8090b5e0745e', '1600210492486-724fe5c67fb0', '1600607687644-c7171b42498f', '1576941089067-2de3c901e126'];
const gallery = (i) => [
  EXTERIORS[i % 10], EXTERIORS[(i + 3) % 10], INTERIORS[i % 5], EXTERIORS[(i + 6) % 10], INTERIORS[(i + 2) % 5],
];

const COMMON_AMENITIES = ['Smart home system', 'Climate-controlled wine room', 'Three-car garage', 'Landscaped gardens'];

export const properties = [
  {
    id: 1, slug: 'lakeside-modern-villa', name: 'Lakeside Modern Villa',
    city: 'Austin', state: 'Texas', price: 2350000, type: 'Villa',
    beds: 5, baths: 4, sqft: 4800, year: 2022, agent: 0, featured: true,
    description: 'An architectural statement on the water, this villa pairs floor-to-ceiling glass with warm natural materials. Open living spaces step out to a heated infinity pool and private dock, framed by mature live oaks and uninterrupted lake views.',
    features: ['Floor-to-ceiling glass walls', 'Infinity pool with sun shelf', 'Private boat dock', 'Chef’s kitchen with island'],
    amenities: ['Outdoor kitchen', 'Home cinema', ...COMMON_AMENITIES.slice(0, 2)],
    images: gallery(0),
  },
  {
    id: 2, slug: 'pacific-glass-house', name: 'Pacific Glass House',
    city: 'Malibu', state: 'California', price: 4800000, type: 'House',
    beds: 4, baths: 5, sqft: 4200, year: 2021, agent: 1, featured: true,
    description: 'Perched above the Pacific, the Glass House dissolves the boundary between interior and coastline. Retractable walls open every principal room to terraces that frame sunsets over the water.',
    features: ['Retractable glass walls', 'Ocean-view primary suite', 'Cantilevered terrace', 'Radiant floor heating'],
    amenities: ['Spa and sauna', 'Fire pit lounge', ...COMMON_AMENITIES.slice(0, 2)],
    images: gallery(1),
  },
  {
    id: 3, slug: 'desert-horizon-estate', name: 'Desert Horizon Estate',
    city: 'Scottsdale', state: 'Arizona', price: 3150000, type: 'Estate',
    beds: 6, baths: 6, sqft: 6100, year: 2020, agent: 2, featured: true,
    description: 'Set against the Sonoran landscape, this estate blends rammed-earth textures with crisp modern lines. Shaded courtyards and a resort-style pool make desert living effortless year round.',
    features: ['Courtyard entry with water feature', 'Detached guest casita', 'Chef’s kitchen and scullery', 'Mountain-view terraces'],
    amenities: ['Resort-style pool', 'Tennis court', ...COMMON_AMENITIES.slice(0, 2)],
    images: gallery(2),
  },
  {
    id: 4, slug: 'oceanfront-residence', name: 'Oceanfront Residence',
    city: 'Miami', state: 'Florida', price: 5200000, type: 'House',
    beds: 5, baths: 6, sqft: 5400, year: 2023, agent: 3, featured: true,
    description: 'Direct oceanfront living with private beach access. Wide terraces, a sculptural staircase and walls of impact glass create a residence made for entertaining.',
    features: ['Private beach access', 'Impact-rated glass', 'Rooftop terrace', 'Elevator to all levels'],
    amenities: ['Infinity pool', 'Boat lift', 'Wellness suite', 'Smart home system'],
    images: gallery(3),
  },
  {
    id: 5, slug: 'modern-hillside-retreat', name: 'Modern Hillside Retreat',
    city: 'Los Angeles', state: 'California', price: 3750000, type: 'House',
    beds: 4, baths: 4, sqft: 3900, year: 2019, agent: 1, featured: true,
    description: 'A quiet retreat in the Hollywood Hills with canyon views and total privacy. Concrete, oak and glass combine in a layout designed around the setting sun.',
    features: ['Canyon and city views', 'Gated motor court', 'Double-height living room', 'Floating staircase'],
    amenities: ['Cantilevered pool', 'Outdoor lounge', ...COMMON_AMENITIES.slice(0, 2)],
    images: gallery(4),
  },
  {
    id: 6, slug: 'palm-garden-residence', name: 'Palm Garden Residence',
    city: 'Beverly Hills', state: 'California', price: 6400000, type: 'Estate',
    beds: 7, baths: 8, sqft: 7200, year: 2022, agent: 0, featured: true,
    description: 'Behind private gates, mature palms and manicured lawns surround a landmark contemporary residence. Grand proportions, gallery-height ceilings and a resort-grade pool deck define the estate.',
    features: ['Gated entry', 'Gallery-height ceilings', 'Library and private office', 'Guest house'],
    amenities: ['Pool and cabana', 'Home gym', 'Screening room', ...COMMON_AMENITIES.slice(0, 1)],
    images: gallery(5),
  },
  {
    id: 7, slug: 'contemporary-lake-house', name: 'Contemporary Lake House',
    city: 'Lake Tahoe', state: 'Nevada', price: 2950000, type: 'House',
    beds: 4, baths: 3, sqft: 3600, year: 2018, agent: 2, featured: true,
    description: 'A refined mountain home with lake views from nearly every room. Timber, stone and glass bring the alpine landscape inside, with generous decks for year-round enjoyment.',
    features: ['Lake-view great room', 'Stone fireplace', 'Wraparound decks', 'Ski storage and mudroom'],
    amenities: ['Hot tub', 'Heated driveway', ...COMMON_AMENITIES.slice(0, 2)],
    images: gallery(6),
  },
  {
    id: 8, slug: 'architectural-downtown-penthouse', name: 'Architectural Downtown Penthouse',
    city: 'Austin', state: 'Texas', price: 1850000, type: 'Penthouse',
    beds: 3, baths: 3, sqft: 2800, year: 2023, agent: 3, featured: true,
    description: 'The top floor of a landmark downtown tower, with a wraparound terrace and skyline views. Designer finishes, a private elevator landing and concierge services complete the experience.',
    features: ['Private elevator landing', 'Wraparound skyline terrace', 'Designer kitchen', 'Two reserved parking spaces'],
    amenities: ['24-hour concierge', 'Rooftop pool', 'Fitness centre', 'Resident lounge'],
    images: gallery(7),
  },
  {
    id: 9, slug: 'cypress-court-villa', name: 'Cypress Court Villa',
    city: 'Scottsdale', state: 'Arizona', price: 2700000, type: 'Villa',
    beds: 5, baths: 5, sqft: 4500, year: 2021, agent: 2, featured: false,
    description: 'A serene courtyard villa with a lap pool, shaded loggias and soft desert planting. Interiors are warm, minimal and made for gathering.',
    features: ['Central courtyard', 'Lap pool', 'Covered loggias', 'Primary suite with spa bath'],
    amenities: ['Outdoor kitchen', 'Putting green', ...COMMON_AMENITIES.slice(0, 2)],
    images: gallery(8),
  },
  {
    id: 10, slug: 'bayview-skyline-penthouse', name: 'Bayview Skyline Penthouse',
    city: 'Miami', state: 'Florida', price: 3400000, type: 'Penthouse',
    beds: 3, baths: 4, sqft: 3100, year: 2022, agent: 3, featured: false,
    description: 'A sky-level residence overlooking Biscayne Bay, with a wraparound terrace and plunge pool. Every room faces the water.',
    features: ['Private plunge pool', 'Bay and skyline views', 'Smart glass terrace doors', 'Private elevator'],
    amenities: ['Valet and concierge', 'Spa and fitness club', 'Marina access', 'Smart home system'],
    images: gallery(9),
  },
];

export const locations = [...new Set(properties.map((p) => `${p.city}, ${p.state}`))].sort();
export const propertyTypes = [...new Set(properties.map((p) => p.type))].sort();

export const formatPrice = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, '')} Million`;
  return `$${n.toLocaleString('en-US')}`;
};
export const locationOf = (p) => `${p.city}, ${p.state}, USA`;
export const getProperty = (slug) => properties.find((p) => p.slug === slug);
