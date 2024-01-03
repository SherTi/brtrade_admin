import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CategoryItem, GalleryItem, ServerResponse} from '../../types';
import { RequestService } from '../../shared/services/request.service';
import { getUtil } from '../../shared/services/request.util';
import {animate, animation, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
  // animations: [
  //   trigger('listCategory', [
  //     transition(':enter', [
  //       animation([
  //         style({
  //           transform: 'translateX(-100%)',
  //         }),
  //         animate('0.2s', style({
  //           transform: 'translateX(0)',
  //         }
  //         )),
  //       ])
  //     ])
  //   ]),
  //   transition(':leave', [
  //     animation([
  //       style({
  //         transform: 'translateX(0)'
  //       }),
  //       animate('0.2', style({
  //         transform:'translateX(-100%)'
  //       }))
  //     ])
  //   ])
  // ]
})
export class AddCategoriesComponent implements OnInit {
  constructor(private client: RequestService) {}

  textTitle = 'Добавить категорию';
  form: FormGroup = new FormGroup<{
    type: FormControl<'tractor' | 'spare' | null>;
    name: FormControl<string | null>;
    image: FormControl<GalleryItem[] | null>;
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    keywords: FormControl<string | null>;
    index: FormControl<string | null>;
  }>({
    type: new FormControl('tractor'),
    name: new FormControl(null, { validators: [Validators.required] }),
    image: new FormControl([]),
    title: new FormControl(),
    description: new FormControl(),
    keywords: new FormControl(),
    index: new FormControl(),
  });

  isOpen: boolean = false;
  tractors: CategoryItem[] = [];
  spares: CategoryItem[] = [];
  get type(): string {
    return this.form.get('type')!.value;
  }

  openModal(type: 'tractor' | 'spare') {
    this.form.get('type')?.setValue(type);
    this.isOpen = true;
  }

  submitForm() {
    const image = this.form.get('image')?.value;
    const type = this.form.get('type')?.value;
    this.client
      .post('/api/category/create', {
        type,
        name: this.form.get('name')?.value,
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        keywords: this.form.get('keywords')?.value,
        index: isNaN(parseInt(this.form.get('index')?.value)) ? null : parseInt(this.form.get('index')?.value),
        image_id: image && image.length ? image[0].id : undefined,
      })
      .subscribe((res: ServerResponse<any>) => {
        if (res.status) {
          this.tractors = res.data!.tractor;
          this.spares = res.data!.spare;
          if (type == 'tractor') {

          } else {

            // this.spares.push(res.data!);
          }
        }
      });
    this.form.reset({
      type: 'tractor',
      name: null,
      image: [],
      title: null,
      description: null,
      keywords: null,
      index: null,
    });
    this.isOpen = false;
  }

  closeModal(event: MouseEvent) {
    if ((event.target as Element).classList.contains('create-category-modal')) {
      this.isOpen = false;
    }
  }

  ngOnInit(): void {
    getUtil<{
      tractor: CategoryItem[];
      spare: CategoryItem[];
    }>('/api/category/get').subscribe((res) => {
      if (res.status) {
        this.tractors = res.data!.tractor;
        this.spares = res.data!.spare;
      }
    });
  }

  onChangedCategories(event: { spare: CategoryItem[]; tractor: CategoryItem[] }) {
    this.spares = event.spare;
    this.tractors = event.tractor;
  }
}
