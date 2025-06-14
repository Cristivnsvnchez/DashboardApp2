export type ColorVariant = 'primary';

export interface Platform {
  id: string;
  name: string;
  url: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  icon: string;
  color: ColorVariant;
}

export interface Category {
  main: string;
  subs: string[];
  color: ColorVariant;
  icon: string;
}