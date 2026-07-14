export interface PokeApiItem {
    name: string;
    cost: number;
    names: { name: string; language: { name: string } }[];
    sprites: { default: string | null };
    // add more fields as you discover them
}

export interface CartEntry {
    item: PokeApiItem;
    quantity: number;
}
