import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryItem, GalleryItem, SettingsResponseData } from '../../types';
import { getUtil } from '../../shared/services/request.util';
import { RequestService } from '../../shared/services/request.service';
import { GalleryStream } from '../../shared/streams/gallery.stream';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(private client: RequestService) {}
  switch: boolean = true;
  form: FormGroup = new FormGroup<any>({
    phone_1: new FormControl<string | null | undefined>(null),
    phone_2: new FormControl<string | null | undefined>(null),
    telegram: new FormControl<string | null | undefined>(null),
    facebook: new FormControl<string | null | undefined>(null),
    instagram: new FormControl<string | null | undefined>(null),
    certificates: new FormControl<GalleryItem[]>([]),
    staff: new FormControl<GalleryItem[]>([]),
    partners: new FormControl<GalleryItem[]>([]),
    image_1: new FormControl<GalleryItem[]>([]),
    image_2: new FormControl<GalleryItem[]>([]),
    image_3: new FormControl<GalleryItem[]>([]),
    cat_1: new FormControl<string | null>(null),
    cat_2: new FormControl<string | null>(null),
    cat_3: new FormControl<string | null>(null),
  });

  categories: CategoryItem[] = [];

  sortCat() {
    const cat1 = this.form.get('cat_1')?.value;
    const cat2 = this.form.get('cat_2')?.value;
    const cat3 = this.form.get('cat_3')?.value;
    for (const val of this.categories) {
      val.selected = val.id === cat1 || val.id === cat2 || val.id === cat3;
    }
  }

  selectChangeHandler() {
    this.sortCat();
  }

  sortResponse(data: SettingsResponseData) {
    this.form.get('phone_1')?.setValue(data.phone_1);
    this.form.get('phone_2')?.setValue(data.phone_2);
    this.form.get('telegram')?.setValue(data.telegram);
    this.form.get('facebook')?.setValue(data.facebook);
    this.form.get('instagram')?.setValue(data.instagram);
    this.form.get('certificates')?.setValue(this.getImages(data.certificates));
    const mainStaff = this.getImage(data.staff_main);
    this.form
      .get('staff')
      ?.setValue([mainStaff, ...this.getImages(data.staff)]);
    this.form.get('partners')?.setValue(this.getImages(data.partners));
    for (let i = 0; i < data.recommended_categories.length; i++) {
      const item = data.recommended_categories[i];
      this.form.get(`image_${i + 1}`)?.setValue([this.getImage(item.image)]);
      this.form.get(`cat_${i + 1}`)?.setValue(item.id);
    }
    this.sortCat();
  }

  getImage(id: string) {
    return GalleryStream.current.find((value) => {
      return value.id === id;
    });
  }

  getImages(ids: string[]) {
    const images: GalleryItem[] = [];
    for (const id of ids) {
      const img: GalleryItem | undefined = GalleryStream.current.find(
        (value) => {
          return value.id === id;
        },
      );
      if (img) {
        images.push({
          id: img.id,
          name: img.name,
          width: img.width,
          height: img.height,
          size: img.size,
          src: img.src,
          selected: true,
          updatedAt: img.updatedAt,
          createdAt: img.createdAt,
        });
      }
    }
    return images;
  }

  submit() {
    const img1 = this.form.get('image_1')?.value;
    const img2 = this.form.get('image_2')?.value;
    const img3 = this.form.get('image_3')?.value;
    if (img1 && img1.length && img2 && img2.length && img3 && img3.length) {
      const certs: string[] = [];
      const staff: string[] = [];
      const partners: string[] = [];
      for (const img of this.form.get('certificates')?.value) {
        certs.push(img.id);
      }
      for (const img of this.form.get('staff')?.value) {
        staff.push(img.id);
      }
      for (const img of this.form.get('partners')?.value) {
        partners.push(img.id);
      }
      const data = {
        phone_1: this.form.get('phone_1')?.value,
        phone_2: this.form.get('phone_2')?.value,
        telegram: this.form.get('telegram')?.value,
        facebook: this.form.get('facebook')?.value,
        instagram: this.form.get('instagram')?.value,
        certificates: certs,
        staff: staff,
        partners,
        image_1: img1[0].id,
        image_2: img2[0].id,
        image_3: img3[0].id,
        cat_1: this.form.get('cat_1')?.value,
        cat_2: this.form.get('cat_2')?.value,
        cat_3: this.form.get('cat_3')?.value,
      };
      this.client.post<any>('/api/settings/update', data).subscribe((res) => {
        if (res.status) {
          this.sortResponse(res.data);
        }
      });
    }
  }

  ngOnInit(): void {
    getUtil<{
      tractor: CategoryItem[];
      spare: CategoryItem[];
    }>('/api/category/get').subscribe((res) => {
      if (res.status) {
        this.categories = [...res.data!.tractor, ...res.data!.spare];
        this.sortCat();
        getUtil<any>('/api/settings/get').subscribe((res) => {
          if (res.status) {
            this.sortResponse(res.data);
          }
        });
      }
    });
  }
}
