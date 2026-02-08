import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { Restaurant } from '../../../types/restaurant';

// return selected restaurant menu
export const restaurantMenuList = (state: RootState) => {
  return state.selectedRestaurant?.restaurant?.menu;
};

// return searchedString (trimmed and lowercase)
export const searchedString = (_: RootState, string: string) => string;

// return all restaurant items
export const allRestaurants = (state: RootState) => {
  return state.restaurants.items;
};

// search inside the selected restaurant menu
export const searchedDataList = createSelector(
  [restaurantMenuList, searchedString],
  (menuList, text) => {
    const trimmedText = text.trim().toLowerCase() || '';
    console.log('In a searchedDataList :', text, menuList);
    if (trimmedText === '') return [];
    const flattenedMenuList =
      menuList?.reduce<any[]>((acc, i) => {
        return [...acc, ...i.items];
      }, []) || [];
    console.log(flattenedMenuList);
    return (
      flattenedMenuList?.filter(i => {
        return i.name.trim().toLowerCase().includes(trimmedText);
      }) || []
    );
  },
);

// GLOBAL : search the restaurant
export const globalSearchRestaurants = createSelector(
  [allRestaurants, searchedString],
  (restaurants: Restaurant[], str) => {
    const trimmedText = str?.trim().toLowerCase() || '';
    if (trimmedText === '') return [];
    return (
      restaurants.filter(r => {
        return r.name.trim().toLowerCase().includes(trimmedText);
      }) || []
    );
  },
);

// GLOBAL : return the foodItems
export const globalSearchFoodItems = createSelector(
  [allRestaurants, searchedString],
  (allData: Restaurant[], str) => {
    const trimmedText = str?.trim().toLowerCase() || '';
    if (trimmedText === '') return [];
    const allFoodItems = allData?.reduce<any[]>((acc, item) => {
      const foodItems = item.menu.reduce<any[]>((acc, i) => {
        return [...acc, ...i.items];
      }, []);
      const itemsWithResId = foodItems.map(i => ({
        ...i,
        restaurantID: item.id,
      }));
      return [...acc, ...itemsWithResId];
    }, []);
    const searchedData = allFoodItems.filter(i =>
      i.name.trim().toLowerCase().includes(trimmedText),
    );
    return searchedData;
  },
);
