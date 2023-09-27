import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServerResponse } from '../../types';
import { Router } from '@angular/router';
import { RequestService } from '../../shared/services/request.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css'],
})
export class SingInComponent {
  constructor(
    private http: RequestService,
    private router: Router,
  ) {}
  form: FormGroup = new FormGroup<{
    login: FormControl;
    password: FormControl;
  }>({
    login: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    password: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
  });
  icon: boolean = true;

  submit() {
    this.http
      .post<{
        token: string;
        time: number;
        expiresIn: number;
      }>('/api/auth/sing-in', {
        login: this.form.get('login')?.value,
        password: this.form.get('password')?.value,
      })
      .subscribe((res) => {
        if (res.status) {
          localStorage.setItem('authorization', res.data!.token);
          this.router.navigate(['']);
        }
      });
  }
}
