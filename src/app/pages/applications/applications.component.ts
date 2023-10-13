import { Component, OnInit } from '@angular/core';
import { getUtil } from '../../shared/services/request.util';

interface Application {
  createdAt: string;
  id: string;
  mail: string;
  name: string;
  phone: string;
  product: string;
  submitted: boolean;
  updatedAt: string;
}

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  ngOnInit(): void {
    getUtil<Application[]>('/api/application/get').subscribe((res) => {
      if (res.status) {
        this.applications = res.data!;
      }
    });
  }
}
