import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryItem, GalleryItem} from "../../../types";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {GalleryStream} from "../../streams/gallery.stream";
import {MessageStream} from "../../streams/message.stream";
import {v4} from "uuid";

@Component({
  selector: '.app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  @Input() category?: CategoryItem;
  @Input() hasSubCategory: boolean = false;
  @Input() type: 'tractor' | 'spare' = 'tractor';
  @Output() onChanged: EventEmitter<{ spare: CategoryItem[], tractor: CategoryItem[] }> = new EventEmitter<{ spare: CategoryItem[], tractor: CategoryItem[] }>()

  constructor(private client: RequestService) {
  }
  isOpen: boolean = false;
  editIsOpen: boolean = false;

  form: FormGroup = new FormGroup<{
    type: FormControl<'tractor' | 'spare' | null>;
    name: FormControl<string | null>;
    image: FormControl<GalleryItem[] | null>;
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    keywords: FormControl<string | null>;
    index: FormControl<string | null>;
  }>({
    type: new FormControl(this.type),
    name: new FormControl(null, { validators: [Validators.required] }),
    image: new FormControl([]),
    title: new FormControl(),
    description: new FormControl(),
    keywords: new FormControl(),
    index: new FormControl(),
  });


  ngOnInit(): void {
    this.image = GalleryStream.current.filter((value) => {
      return value.id === this.category!.image_id;
    });
  }

  image: GalleryItem[] = [];

  openModal() {
    this.isOpen = true;
  }

  openEditModal() {
    this.editIsOpen = true;
  }

  toggleSubCategory(event: MouseEvent, id: string) {
    if (this.category && (event.target as Element).classList.contains(`click-${id}`)) {
      // console.log((!!this.category.is_open)!);
      this.category.is_open = !(!!this.category.is_open);
    }
  }

  submitForm(category_id: string) {
    const image = this.form.get('image')?.value;
    const type = this.form.get('type')?.value;
    this.client
      .post<any>('/api/category/create', {
        type,
        name: this.form.get('name')?.value,
        image_id: image && image.length ? image[0].id : undefined,
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        keywords: this.form.get('keywords')?.value,
        index: isNaN(parseInt(this.form.get('index')?.value)) ? null : parseInt(this.form.get('index')?.value),
        category_id
      })
      .subscribe((res) => {
        if (res.status) {
          this.onChanged.emit(res.data);
        }
      });
    this.form.reset({
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

  closeEditModal(event: MouseEvent) {
    if ((event.target as Element).classList.contains('edit-category-modal')) {
      this.editIsOpen = false;
    }
  }


  submitEdit() {
    if (this.image.length) {
      this.category!.image_id = this.image[0].id;
      this.client
        .post('/api/category/edit', {
          type: this.type,
          name: this.category?.name,
          image_id: this.image && this.image.length ? this.image[0].id : undefined,
          title: this.category?.title,
          description: this.category?.description,
          keywords: this.category?.keywords,
          index: isNaN(parseInt(this.category?.index as any)) ? null : parseInt(this.category?.index as any),
          category_id: this.category!.category_id,
          change_category_id: this.category?.id,
        })
        .subscribe((res) => {
          if (res.status) {
            this.editIsOpen = false;
            MessageStream.createMessage({
              id: v4(),
              error: false,
              message: 'Успешно сохранён!',
            });
            this.onChanged.emit(res.data as any);
          }
        });
    }
  }

  childChange(event: { spare: CategoryItem[]; tractor: CategoryItem[] }) {
    this.onChanged.emit(event);
  }
}
