export interface Alcohol {
  uuid: string;
  degree: number;
  amount: number;
  englishName: string;
  name: string;
  imageUrl: string;
  description?: string;
  age?: 'N/A' | number;
  storePrices: StorePrice[];
  category: string[];
}

export interface StorePrice {
  buyDate: Date|string;
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
  imageUrl: 'https://cdn-icons-png.flaticon.com/512/920/920582.png',
  description: '',
  age: 'N/A',
  storePrices: [],
  category: []
}as Alcohol;

export const StorePriceStructure = {
  buyDate: new Date(),
  amount: 0,
  storeName: '',
  price: 0,
  priceType: '',
  etc: '',
}
