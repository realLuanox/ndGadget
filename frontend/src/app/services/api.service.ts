import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {
  }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  async getAsync<T>(url: string): Promise<T> {
    // @ts-ignore
    return this.httpClient.get<T>(url).toPromise();
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body);
  }

  async postAsync<T>(url: string, body: any): Promise<T> {
    // @ts-ignore
    return this.post<T>(url, body).toPromise();
  }
}
