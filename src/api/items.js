export async function fetchCategoryItems(category) {
  if (category.items) return category.items;

  const results = await Promise.all(
    category.apiCategories.map((name) =>
      fetch(`https://pokeapi.co/api/v2/item-category/${name}`).then((res) =>
        res.json(),
      ),
    ),
  );

  return results
    .flatMap((r) => r.items)
    .filter(
      (item) => !item.name.startsWith('la') && !item.name.startsWith('tr'),
    );
}

export function fetchItemDetail(url) {
  return fetch(url).then((res) => res.json());
}

export function fetchMachineMove(item, versionGroup = 'red-blue') {
  const machineEntry = item.machines?.find(
    (m) => m.version_group.name === versionGroup,
  );

  if (!machineEntry) return Promise.resolve(null);
  return fetch(machineEntry.machine.url)
    .then((res) => res.json())
    .then((machine) => fetch(machine.move.url))
    .then((res) => res.json())
    .then((move) => ({ name: move.name, type: move.type.name }));
}
