import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IUserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'https://reqres.in/api/users';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<IUserResponse> {
    return this.httpClient.get<IUserResponse>(this.url);
  }

  createUser(userData: { name: string; job: string }): Observable<any> {
  return this.httpClient.post<any>(this.url, userData);
}
}
