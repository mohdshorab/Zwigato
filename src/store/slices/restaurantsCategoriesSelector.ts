import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Restaurant } from '../../types/restaurant';

const cats = (state: RootState) => state.restaurantsCategories.categories;
const selectedCatId = (_: RootState, id: string | null | undefined) => id;
const allRestaurantsData = (state: RootState) => state.restaurants.items;
const getSelectedCategory = (
  _: RootState,
  categoryName: string | null | undefined,
) => categoryName;

export const selectedCategory = createSelector(
  [cats, selectedCatId],
  (categories, id) => {
    if (!id) return null;
    if (id === '0') return id;
    const found = categories?.find(i => i?.id === id);
    return found ? found.name : null;
  },
);

export const dataAsPerSelectedCat = createSelector(
  [allRestaurantsData, getSelectedCategory],
  (items: Restaurant[], selectedCatName) => {
    if (!selectedCatName) return null;
    if (selectedCatName === '0') return items;
    return items.filter(item => item?.cuisines?.includes(selectedCatName));
  },
);
