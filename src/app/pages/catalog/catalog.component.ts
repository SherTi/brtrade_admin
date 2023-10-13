import { Component, OnInit } from '@angular/core';
import { getUtil } from '../../shared/services/request.util';
import { RequestService } from '../../shared/services/request.service';

interface Product {
  category_id: string;
  chars: any[];
  createdAt: string;
  desc: string;
  id: string;
  isRecommended: boolean;
  main_chars: any[];
  main_image: string;
  name: string;
  sd_image: string;
  st_image: string;
  th_image: string;
  updatedAt: string;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  constructor(private client: RequestService) {}
  products: Product[] = [];
  ngOnInit(): void {
    getUtil<Product[]>('/api/product/get').subscribe((res) => {
      if (res.status) {
        this.products = res.data!;
      }
    });
  }

  toggleRecommended(p: Product) {
    this.client
      .post<boolean>('/api/product/recommended', {
        id: p.id,
      })
      .subscribe((res) => {
        if (res.status) {
          p.isRecommended = res.data!;
        }
      });
  }

  delete(p: Product) {
    this.client
      .post<boolean>('/api/product/delete', {
        id: p.id,
      })
      .subscribe((res) => {
        if (res.status) {
          this.products = this.products.filter((val) => {
            return val.id !== p.id;
          });
        }
      });
  }
}
