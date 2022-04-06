export interface Alcohol {
  uuid: string;
  degree: number;
  amount: number;
  englishName: string;
  name: string;
  image: string;
  description?: string;
  age?: 'N/A' | number;
  storePrices: StorePrice[];
  category: string[];
}

export interface StorePrice {
  buyDate: string;
  amount: number;
  storeName: string;
  price: number;
  priceType?: string;
  etc?: string;
}

export const AlcoholStructure = {
  uuid: '',
  degree: 0,
  amount: 700,
  englishName: '',
  name: '',
  image: '',
  description: '',
  age: 'N/A',
  storePrices: [],
  category: []
}as Alcohol;
