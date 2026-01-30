import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { FOOD_TYPES } from '../../../utils/constants/restaurantConstants';

const restaurantMenuDetails = (state: RootState) =>
  state.selectedRestaurant.restaurant?.menu;
const selectedFilterId = (_: RootState, id: number) => id;

export const filteredData = createSelector(
  [restaurantMenuDetails, selectedFilterId],
  (menu, id) => {
    return menu
      ? menu
          .map(m => {
            const filteredFoodItems = m?.items.filter(i => {
              if (id === FOOD_TYPES.VEG.id) return i?.isVeg === true;
              if (id === FOOD_TYPES.NON_VEG.id) return i?.isVeg === false;
              return true;
            });
            return {
              title: m?.category,
              data: filteredFoodItems,
            };
          })
          .filter(s => s.data.length > 0)
      : [];
  },
);
