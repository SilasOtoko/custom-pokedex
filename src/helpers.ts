const SPRITE_OVERRIDES = {
  'macho-brace': 'https://www.serebii.net/itemdex/sprites/pgl/machobrace.png',
  'sweet-heart': 'https://www.serebii.net/itemdex/sprites/pgl/sweetheart.png',
  'berry-juice': 'https://www.serebii.net/itemdex/sprites/pgl/berryjuice.png',
  'sacred-ash': 'https://www.serebii.net/itemdex/sprites/pgl/sacredash.png',
  'max-honey': 'https://www.serebii.net/itemdex/sprites/maxhoney.png',
  'old-gateau': 'https://www.serebii.net/itemdex/sprites/pgl/oldgateau.png',
  casteliacone: 'https://www.serebii.net/itemdex/sprites/pgl/casteliacone.png',
  'big-malasada': 'https://www.serebii.net/itemdex/sprites/pgl/bigmalasada.png',
  'pewter-crunchies':
    'https://www.serebii.net/itemdex/sprites/pewtercrunchies.png',
  'kings-rock': `https://www.serebii.net/itemdex/sprites/sv/king'srock.png`,
};

export function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }

  return str;
}

export function getEnglishEntry(
  arr: { name: string; language: { name: string } }[],
) {
  return arr?.find((entry) => entry.language.name === 'en');
}

export function formatSpriteName(name) {
  return name?.replaceAll('-', '');
}

export function formatLabel(str) {
  return str?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const TM_TYPE_SPRITES: Record<string, string> = {
  normal: '/tm-sprites/normal.png',
  fire: '/tm-sprites/fire.png',
  water: '/tm-sprites/water.png',
  electric: '/tm-sprites/electric.png',
  grass: '/tm-sprites/grass.png',
  ice: '/tm-sprites/ice.png',
  fighting: '/tm-sprites/fighting.png',
  poison: '/tm-sprites/poison.png',
  ground: '/tm-sprites/ground.png',
  flying: '/tm-sprites/flying.png',
  psychic: '/tm-sprites/psychic.png',
  bug: '/tm-sprites/bug.png',
  rock: '/tm-sprites/rock.png',
  ghost: '/tm-sprites/ghost.png',
  dragon: '/tm-sprites/dragon.png',
  dark: '/tm-sprites/dark.png',
  steel: '/tm-sprites/steel.png',
  fairy: '/tm-sprites/fairy.png',
};

export function getItemSpriteUrl(name: string, moveType?: string): string {
  if (SPRITE_OVERRIDES[name]) return SPRITE_OVERRIDES[name];

  const tmMatch = name?.match(/^(hm|tm)(\d+)$/);
  if (tmMatch) {
    return TM_TYPE_SPRITES[moveType ?? ''] ?? TM_TYPE_SPRITES.normal;
  }

  return `https://www.serebii.net/itemdex/sprites/sv/${formatSpriteName(name)}.png`;
}
