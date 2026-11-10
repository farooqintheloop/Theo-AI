export type Hotel = {
  id: string
  name: string
  city: string
  country: string
  image: string
  rating: number
  reviews: number
  priceFrom: number
  currency: string
  description: string
  address: string
  phone: string
  hours: string
  amenities: string[]
  receptionist: string
  greeting: string
}

export const hotels: Hotel[] = [
  {
    id: 'grand-plaza',
    name: 'Grand Plaza Hotel',
    city: 'London',
    country: 'United Kingdom',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: 1284,
    priceFrom: 210,
    currency: 'GBP',
    description:
      'A Mayfair landmark with a courtyard restaurant, spa, and 24/7 THEO receptionist. Check-in from 3pm. Breakfast 7:00–10:30 in the courtyard.',
    address: '18 Berkeley Square, London W1J 6EX',
    phone: '+44 20 7946 0100',
    hours: 'Front desk open 24 hours',
    amenities: ['Spa', 'Restaurant', 'Valet parking', 'Concierge', 'Wi-Fi'],
    receptionist: 'Sophia',
    greeting: 'Welcome to Grand Plaza. How can I help with your stay?',
  },
  {
    id: 'harbourview',
    name: 'Harbourview Residences',
    city: 'Dublin',
    country: 'Ireland',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviews: 742,
    priceFrom: 165,
    currency: 'EUR',
    description:
      'Docklands suites overlooking the Liffey. Family rooms, late checkout on request, and a lobby café until 11pm.',
    address: '2 North Wall Quay, Dublin 1',
    phone: '+353 1 555 0142',
    hours: 'Café 07:00–23:00 · Desk 24 hours',
    amenities: ['River view', 'Family rooms', 'Gym', 'Café', 'Wi-Fi'],
    receptionist: 'Niamh',
    greeting: 'Hello from Harbourview. Looking for a room or restaurant booking?',
  },
  {
    id: 'palais-noir',
    name: 'Palais Noir',
    city: 'Paris',
    country: 'France',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: 2103,
    priceFrom: 340,
    currency: 'EUR',
    description:
      'Boutique rooms in the 8th arrondissement. Michelin-informed bistro, courtyard garden, and quiet hours after 10pm.',
    address: '41 Rue du Faubourg Saint-Honoré, 75008 Paris',
    phone: '+33 1 42 00 18 18',
    hours: 'Bistro 12:00–22:30 · Desk 24 hours',
    amenities: ['Bistro', 'Garden', 'Room service', 'Spa', 'Wi-Fi'],
    receptionist: 'Camille',
    greeting: 'Bonjour, this is Palais Noir. How may I assist your visit to Paris?',
  },
  {
    id: 'azure-coast',
    name: 'Azure Coast',
    city: 'Lisbon',
    country: 'Portugal',
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    reviews: 516,
    priceFrom: 140,
    currency: 'EUR',
    description:
      'Clifftop rooms in Cascais with a saltwater pool. Transfer from Lisbon airport on request. Pool bar until sunset.',
    address: 'Avenida Marginal 112, Cascais',
    phone: '+351 21 480 2200',
    hours: 'Pool 08:00–20:00 · Desk 24 hours',
    amenities: ['Pool', 'Sea view', 'Airport transfer', 'Bar', 'Wi-Fi'],
    receptionist: 'Inês',
    greeting: 'Welcome to Azure Coast. Shall I help with rooms, the pool, or dinner?',
  },
  {
    id: 'alpine-lodge',
    name: 'Alpine Lodge',
    city: 'Zermatt',
    country: 'Switzerland',
    image:
      'https://images.unsplash.com/photo-1517824806704-3b1318db7884?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviews: 389,
    priceFrom: 280,
    currency: 'CHF',
    description:
      'Ski-in timber lodge facing the Matterhorn. Boot room, fondue restaurant, and luggage storage after checkout.',
    address: 'Bahnhofstrasse 54, 3920 Zermatt',
    phone: '+41 27 966 2200',
    hours: 'Restaurant 18:00–21:30 · Desk 07:00–23:00',
    amenities: ['Ski storage', 'Sauna', 'Restaurant', 'Fireplace', 'Wi-Fi'],
    receptionist: 'Lukas',
    greeting: 'Greetings from Alpine Lodge. Need ski storage, a table, or a room?',
  },
  {
    id: 'desert-pearl',
    name: 'Desert Pearl',
    city: 'Dubai',
    country: 'United Arab Emirates',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: 1876,
    priceFrom: 320,
    currency: 'AED',
    description:
      'Palm-facing tower with private beach access. Friday brunch, kids club, and late checkout until 2pm when available.',
    address: 'Palm Jumeirah East Crescent, Dubai',
    phone: '+971 4 430 8888',
    hours: 'Beach 06:00–sunset · Desk 24 hours',
    amenities: ['Private beach', 'Kids club', 'Brunch', 'Pool', 'Wi-Fi'],
    receptionist: 'Amira',
    greeting: 'Welcome to Desert Pearl. I can help with rooms, brunch, or the beach club.',
  },
  {
    id: 'sakura-court',
    name: 'Sakura Court',
    city: 'Kyoto',
    country: 'Japan',
    image:
      'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: 964,
    priceFrom: 260,
    currency: 'JPY',
    description:
      'Ryokan-inspired rooms near Gion. Onsen bath, kaiseki dinner (book 48 hours ahead), and no check-in after midnight without notice.',
    address: 'Shijo-dori, Higashiyama, Kyoto',
    phone: '+81 75 525 1100',
    hours: 'Onsen 15:00–22:00 · Desk 07:00–23:00',
    amenities: ['Onsen', 'Kaiseki', 'Garden', 'Yukata', 'Wi-Fi'],
    receptionist: 'Hana',
    greeting: 'Irasshaimase. Sakura Court can help with rooms, onsen times, or dinner.',
  },
  {
    id: 'brooklyn-foundry',
    name: 'Brooklyn Foundry',
    city: 'New York',
    country: 'United States',
    image:
      'https://images.unsplash.com/photo-1501117716987-c8e1ecb2102d?auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    reviews: 1102,
    priceFrom: 189,
    currency: 'USD',
    description:
      'Converted warehouse lofts in Williamsburg. Rooftop at sunset, espresso bar from 6:30am, pet-friendly on request.',
    address: '88 Kent Avenue, Brooklyn, NY 11249',
    phone: '+1 718 555 0199',
    hours: 'Rooftop 16:00–22:00 · Desk 24 hours',
    amenities: ['Rooftop', 'Pet friendly', 'Espresso bar', 'Gym', 'Wi-Fi'],
    receptionist: 'Maya',
    greeting: 'Hey, this is Brooklyn Foundry. Room, rooftop, or neighbourhood tips?',
  },
  {
    id: 'casa-sol',
    name: 'Casa Sol',
    city: 'Barcelona',
    country: 'Spain',
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviews: 688,
    priceFrom: 175,
    currency: 'EUR',
    description:
      'Eixample townhouse with a tiled courtyard pool. Tapas at dusk. City tax is collected at the desk, not in the room rate.',
    address: 'Carrer de Provença 290, Barcelona',
    phone: '+34 93 215 4400',
    hours: 'Pool 09:00–20:00 · Desk 24 hours',
    amenities: ['Courtyard pool', 'Tapas', 'Bikes', 'Air conditioning', 'Wi-Fi'],
    receptionist: 'Jordi',
    greeting: 'Hola from Casa Sol. I can help with rooms, the pool, or a tapas table.',
  },
  {
    id: 'northern-light',
    name: 'Northern Light Hotel',
    city: 'Oslo',
    country: 'Norway',
    image:
      'https://images.unsplash.com/photo-1496417263034-38ec4f0d6650?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    reviews: 431,
    priceFrom: 195,
    currency: 'NOK',
    description:
      'Fjord-facing rooms in Aker Brygge. Sauna, seafood grill, and complimentary tram cards for stays of two nights or more.',
    address: 'Stranden 7, 0250 Oslo',
    phone: '+47 22 83 40 00',
    hours: 'Grill 17:00–22:00 · Desk 24 hours',
    amenities: ['Sauna', 'Fjord view', 'Grill', 'Tram cards', 'Wi-Fi'],
    receptionist: 'Sigrid',
    greeting: 'Welcome to Northern Light. Rooms, sauna, or a table at the grill?',
  },
  {
    id: 'oak-and-vine',
    name: 'The Oak & Vine',
    city: 'Edinburgh',
    country: 'United Kingdom',
    image:
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviews: 590,
    priceFrom: 155,
    currency: 'GBP',
    description:
      'Townhouse hotel on the Royal Mile. Whisky lounge, breakfast until 11am on Sundays, and castle-view suites.',
    address: '72 High Street, Edinburgh EH1 1SZ',
    phone: '+44 131 555 0177',
    hours: 'Lounge 12:00–23:00 · Desk 24 hours',
    amenities: ['Whisky lounge', 'Castle view', 'Breakfast', 'Library', 'Wi-Fi'],
    receptionist: 'Fraser',
    greeting: 'Welcome to The Oak & Vine. A room, whisky lounge, or breakfast booking?',
  },
  {
    id: 'marina-house',
    name: 'Marina House',
    city: 'Singapore',
    country: 'Singapore',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: 1540,
    priceFrom: 240,
    currency: 'SGD',
    description:
      'Bay-front hotel with an infinity pool and hawker-style breakfast hall. Orchard shuttle every 30 minutes from 9am to 6pm.',
    address: '1 Marina Boulevard, Singapore 018989',
    phone: '+65 6688 9000',
    hours: 'Pool 06:00–22:00 · Desk 24 hours',
    amenities: ['Infinity pool', 'Shuttle', 'Breakfast hall', 'Club lounge', 'Wi-Fi'],
    receptionist: 'Mei',
    greeting: 'Hello from Marina House. I can help with rooms, the pool, or the shuttle.',
  },
]
