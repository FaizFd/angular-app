import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  feedbackForm: FormGroup;
  showThankYouMessage: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      job: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const { name, job } = this.feedbackForm.value;

      // Post user data to ReqRes
      this.apiService.createUser({ name, job }).subscribe({
        next: (response) => {
          console.log('User created:', response);
          this.showThankYouMessage = true;
          this.feedbackForm.reset();
          setTimeout(() => {
            this.showThankYouMessage = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error creating user:', error);
        }
      });
    }
  }
}
