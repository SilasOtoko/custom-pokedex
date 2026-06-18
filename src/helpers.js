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
