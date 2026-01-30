export interface FilterOption {
  id: number;
  title: string;
  icon: string;
  action: string;
}
export const FOOD_TYPES = {
  VEG: { id: 111, type: 'Veg' },
  NON_VEG: { id: 999, type: 'Non-Veg' },
} as const;

export const RESTAURANT_FILTERS: FilterOption[] = [
  { id: 1, title: 'Filters', icon: 'options-outline', action: 'MODAL' },
  { id: FOOD_TYPES.VEG.id, title: 'Veg', icon: 'leaf', action: 'TOGGLE' },
  {
    id: FOOD_TYPES.NON_VEG.id,
    title: 'Non-Veg',
    icon: 'leaf',
    action: 'TOGGLE',
  },
  { id: 4, title: 'Sort', icon: 'swap-vertical-outline', action: 'MODAL' },
];

export const SORT_OPTIONS = [
  { id: 'price-asc', title: 'Price: Low to High', icon: 'arrow-up' },
  { id: 'price-desc', title: 'Price: High to Low', icon: 'arrow-down' },
  { id: 'rating', title: 'Rating', icon: 'star' },
  { id: 'popular', title: 'Popularity', icon: 'flame' },
];
