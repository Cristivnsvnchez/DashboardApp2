export interface Platform {
  id: string;
  name: string;
  url: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  icon: string;
  color: string;
}

export interface Category {
  main: string;
  subs: string[];
  color: string;
}