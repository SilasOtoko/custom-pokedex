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

export function getEnglishEntry(arr) {
  return arr?.find((entry) => entry.language.name === 'en');
}

export function formatSpriteName(name) {
  return name?.replaceAll('-', '');
}

export function formatLabel(str) {
  return str?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getItemSpriteUrl(name) {
  if (SPRITE_OVERRIDES[name]) return SPRITE_OVERRIDES[name];

  const tmMatch = name?.match(/^(hm|tm)(\d+)$/);
  if (tmMatch) {
    return `https://www.serebii.net/itemdex/sprites/${tmMatch[1]}${tmMatch[2].padStart(2, '0')}.png`;
  }

  return `https://www.serebii.net/itemdex/sprites/sv/${formatSpriteName(name)}.png`;
}
