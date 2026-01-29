export interface CustomizationOption {
  name: string;
  price: number;
}

export interface AddOnOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  serves: string;
  customization: CustomizationOption[];
  addOns: AddOnOption[];
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  address: string;
  rating: number;
  ratingCount: string;
  deliveryTime: string;
  offers: string;
  costForTwo: number;
  cuisines: string[];
  menu: MenuCategory[];
}
