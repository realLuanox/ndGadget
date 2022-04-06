import { Injectable } from '@angular/core';
import {Alcohol} from "../interfaces/alcohol";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AlcoholService {
  alcoholData = [] as Alcohol[];

  constructor(private apiService: ApiService) {
    this.apiService.get<Alcohol[]>(`/api/AlcList.json`).subscribe(value => {
      this.alcoholData = value;
    });
  }

  async getAlcohol(): Promise<Alcohol[]> {
    return this.alcoholData;
  }
}
