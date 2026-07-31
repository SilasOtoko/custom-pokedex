const POKEMON_LOCATIONS = [
  { city: 'Pallet Town', region: 'Kanto' },
  { city: 'Viridian City', region: 'Kanto' },
  { city: 'Pewter City', region: 'Kanto' },
  { city: 'Cerulean City', region: 'Kanto' },
  { city: 'Vermilion City', region: 'Kanto' },
  { city: 'Lavender Town', region: 'Kanto' },
  { city: 'Celadon City', region: 'Kanto' },
  { city: 'Fuchsia City', region: 'Kanto' },
  { city: 'Saffron City', region: 'Kanto' },
  { city: 'Cinnabar Island', region: 'Kanto' },
  { city: 'New Bark Town', region: 'Johto' },
  { city: 'Cherrygrove City', region: 'Johto' },
  { city: 'Violet City', region: 'Johto' },
  { city: 'Azalea Town', region: 'Johto' },
  { city: 'Goldenrod City', region: 'Johto' },
  { city: 'Ecruteak City', region: 'Johto' },
  { city: 'Olivine City', region: 'Johto' },
  { city: 'Cianwood City', region: 'Johto' },
  { city: 'Littleroot Town', region: 'Hoenn' },
  { city: 'Rustboro City', region: 'Hoenn' },
  { city: 'Dewford Town', region: 'Hoenn' },
  { city: 'Slateport City', region: 'Hoenn' },
  { city: 'Mauville City', region: 'Hoenn' },
  { city: 'Lavaridge Town', region: 'Hoenn' },
  { city: 'Fortree City', region: 'Hoenn' },
  { city: 'Twinleaf Town', region: 'Sinnoh' },
  { city: 'Sandgem Town', region: 'Sinnoh' },
  { city: 'Jubilife City', region: 'Sinnoh' },
  { city: 'Oreburgh City', region: 'Sinnoh' },
  { city: 'Floaroma Town', region: 'Sinnoh' },
  { city: 'Hearthome City', region: 'Sinnoh' },
  { city: 'Nuvema Town', region: 'Unova' },
  { city: 'Accumula Town', region: 'Unova' },
  { city: 'Nacrene City', region: 'Unova' },
  { city: 'Castelia City', region: 'Unova' },
  { city: 'Nimbasa City', region: 'Unova' },
  { city: 'Lumiose City', region: 'Kalos' },
  { city: 'Aquacorde Town', region: 'Kalos' },
  { city: 'Santalune City', region: 'Kalos' },
  { city: 'Hau\'oli City', region: 'Alola' },
  { city: 'Heahea City', region: 'Alola' },
  { city: 'Konikoni City', region: 'Alola' },
  { city: 'Motostoke', region: 'Galar' },
  { city: 'Hulbury', region: 'Galar' },
  { city: 'Hammerlocke', region: 'Galar' },
  { city: 'Mesagoza', region: 'Paldea' },
  { city: 'Cortondo', region: 'Paldea' },
  { city: 'Levincia', region: 'Paldea' },
];

const STREET_NAMES = [
  'Oak', 'Elm', 'Birch', 'Rowan', 'Juniper', 'Sycamore', 'Kukui',
  'Pokécenter', 'Gym', 'Berry', 'Trainer', 'Safari', 'Poké Ball',
  'Rapidash', 'Pidgey', 'Rattata', 'Clefairy', 'Jigglypuff',
];

const STREET_TYPES = ['Lane', 'Road', 'Street', 'Avenue', 'Path', 'Way', 'Drive', 'Court'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateTrainerAddress() {
  const location = pick(POKEMON_LOCATIONS);
  const number = Math.floor(Math.random() * 99) + 1;
  const street = `${number} ${pick(STREET_NAMES)} ${pick(STREET_TYPES)}`;

  return {
    address: street,
    city: location.city,
    region: location.region,
  };
}
