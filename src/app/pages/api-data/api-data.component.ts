import { Component, OnInit } from '@angular/core';
import { ApiService, IUser, IUserResponse } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.css']
})
export class ApiDataComponent implements OnInit {
  users: IUser[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch users from the API and store them in `users` array
    this.apiService.getUsers().subscribe((response: IUserResponse) => {
      this.users = response.data; // `data` array from the API response
    });
  }

  trackById(index: number, user: IUser): number {
    return user.id;
  }
}
