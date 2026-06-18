export async function fetchCategoryItems(apiCategories) {
  const results = await Promise.all(apiCategories.map((name) => fetch(`https://pokeapi.co/api/v2/item-category/${name}`).then((res) => res.json())));

  return results.flatMap((r) => r.items).filter((item) => !item.name.startsWith('la'));
}

export function fetchItemDetail(url) {
  return fetch(url).then((res) => res.json());
}
