export interface PokeApiItem {
  name: string;
  cost: number;
  names: { name: string; language: { name: string } }[];
  sprites: { default: string | null };
  category: { name: string };
  effect_entries: { short_effect: string; language: { name: string } }[];
  flavor_text_entries: { text: string; language: { name: string }; version: { name: string } }[];
}

export interface CartEntry {
  item: PokeApiItem;
  quantity: number;
}

export interface PokemonListItem {
  name: string;
  id: number;
}

export interface OrderForm {
  name: string;
  email: string;
  region: string;
  city: string;
  address: string;
}

export interface Order {
  id: string;
  items: CartEntry[];
  total: number;
  form: OrderForm;
  createdAt: number;
  status: string;
}
