import {Injectable} from '@angular/core';
import {Alcohol} from "../interfaces/alcohol";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AlcoholService {
  alcoholData = [] as Alcohol[];
  alcoholName = [] as string[];
  alcoholEnglishName = [] as string[];
  categories = [] as string[];
  detailedCategories = [] as string[];

  constructor(private apiService: ApiService) {
    this.apiService.get<Alcohol[]>(`/api/alcohol`).subscribe(value => {
      this.alcoholData = value;
    });
    this.getAlcoholName().then(value => {
      this.alcoholName = value.map(v => v.korean);
      this.alcoholEnglishName = value.map(v => v.english);
    })
  }

  async getAlcoholData(): Promise<Alcohol[]> {
    return this.apiService.getAsync<Alcohol[]>('/api/alcohol');
  }

  async getAlcoholName(): Promise<{
    english: string,
    korean: string
  }[]> {
    return this.apiService.getAsync<{
      english: string,
      korean: string
    }[]>('/api/alcohol/name');
  }

  async getCategories(): Promise<string[]> {
    return this.apiService.getAsync<string[]>('/api/categories');
  }

  async getDetailedCategories(): Promise<string[]> {
    return this.apiService.getAsync<string[]>('/api/categories/detailed');
  }
}
