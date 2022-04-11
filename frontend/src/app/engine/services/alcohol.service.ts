import {Injectable} from '@angular/core';
import {Alcohol} from "../interfaces/alcohol";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AlcoholService {
  alcoholData = [] as Alcohol[];
  Alcohol = [] as string[];
  categories = [] as string[];
  detailedCategories = [] as string[];

  constructor(private apiService: ApiService) {
    this.apiService.get<Alcohol[]>(`/api/AlcList.json`).subscribe(value => {
      this.alcoholData = value;
    });
  }

  async getAlcoholData(): Promise<Alcohol[]> {
    return await this.apiService.getAsync<Alcohol[]>('/api/AlcList.json');
  }

  async getAlcohol(): Promise<string[]> {
    return await this.apiService.getAsync<string[]>('api/AlcName.json');
  }

  async getCategories(): Promise<string[]> {
    return await this.apiService.getAsync<string[]>('/api/categories.json');
  }

  async getDetailedCategories(): Promise<string[]> {
    return await this.apiService.getAsync<string[]>('/api/detailed_categories.json');
  }
}
