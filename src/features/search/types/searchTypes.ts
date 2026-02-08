import { MenuItem, Restaurant } from "../../../types/restaurant";

export type GlobalSearchItem = HeaderItem | RestaurantItem | DishItem;

export interface HeaderItem {
  type: 'header';
  title: string;
}

export interface RestaurantItem {
  type: 'restaurant';
  data: Restaurant;
}

export interface DishItem {
  type: 'dish';
  data: MenuItem;
}