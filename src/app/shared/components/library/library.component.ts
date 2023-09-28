import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GalleryItem } from '../../../types';
import { GalleryStream } from '../../streams/gallery.stream';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => LibraryComponent),
    },
  ],
})
export class LibraryComponent
  implements ControlValueAccessor, OnDestroy, OnInit
{
  @Input() limit: number = 1;
  @Input() disabled = false;
  @Input() placeholder: string = 'Загрузите фото';
  @Input() limitWidth?: number;
  @Input() limitHeight?: number;

  constructor(private client: RequestService) {}

  isOpen: boolean = false;

  value: GalleryItem[] = [];
  onChange: (value: GalleryItem[]) => void = () => {};
  onTouched: (val: boolean) => void = () => {};

  writeValue(obj: GalleryItem[]): void {
    this.value = obj;
  }
  registerOnChange(fn: (value: GalleryItem[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: (val: boolean) => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  items: GalleryItem[] = [];

  onClick(item: any) {
    const filtered = this.items.filter((i) => {
      return !!i.selected;
    });

    if (this.limit == 1 && (filtered.length == 1 || filtered.length == 0)) {
      for (const i of this.items) {
        i.selected = false;
      }
      item.selected = true;
      this.value = this.items.filter((i) => {
        return !!i.selected;
      });
    } else if (filtered.length < this.limit) {
      item.selected = true;
      this.value = this.items.filter((i) => {
        return !!i.selected;
      });
    }
  }

  closeModal(event: MouseEvent) {
    if (
      (event.target as Element).classList.contains('modal-window-background')
    ) {
      this.isOpen = false;
    }
  }

  private _subscription?: Subscription;

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  ngOnInit(): void {
    for (const i of GalleryStream.current) {
      let width: boolean = false;
      let height: boolean = false;
      if (this.limitWidth) {
        width = this.limitWidth == i.width;
      } else {
        width = true;
      }
      if (this.limitHeight) {
        height = this.limitHeight == i.height;
      } else {
        height = true;
      }
      if (width && height) {
        this.items.push({
          id: i.id,
          size: i.size,
          width: i.width,
          height: i.height,
          src: i.src,
          createdAt: i.createdAt,
          updatedAt: i.updatedAt,
        });
      }
    }
    this._subscription = GalleryStream.subscribe((value) => {
      const result: GalleryItem[] = [];
      for (const i of value) {
        let width: boolean = false;
        let height: boolean = false;
        if (this.limitWidth) {
          width = this.limitWidth == i.width;
        } else {
          width = true;
        }
        if (this.limitHeight) {
          height = this.limitHeight == i.height;
        } else {
          height = true;
        }
        if (width && height) {
          result.push({
            id: i.id,
            size: i.size,
            width: i.width,
            height: i.height,
            src: i.src,
            createdAt: i.createdAt,
            updatedAt: i.updatedAt,
          });
        }
      }
      this.items = result;
    });
  }

  openLibrary() {
    this.isOpen = true;
    for (const item of this.items) {
      const find = this.value.find((val) => {
        return val.id == item.id;
      });
      if (find) {
        item.selected = true;
      }
    }
  }

  preventDefault(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  async sortImages(files: FileList) {
    const form = new FormData();
    const sizes: any[] = [];
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      if (
        file.type == 'image/png' ||
        file.type == 'image/jpg' ||
        file.type == 'image/jpeg' ||
        file.type == 'image/svg+xml' ||
        file.type == 'image/svg'
      ) {
        const val = await this.getImageSize(file);
        form.append('images', file);
        sizes.push(val);
      }
    }
    form.append('sizes', JSON.stringify(sizes));
    this.client
      .post<GalleryItem[]>('/api/gallery/create', form)
      .subscribe((res) => {
        if (res.status) {
          GalleryStream.current = [...GalleryStream.current, ...res.data!];
        }
      });
  }

  getImageSize(image: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      const fr = new FileReader();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };

      fr.onload = () => {
        img.src = fr.result as string;
      };
      fr.readAsDataURL(image);
    });
  }

  dropImage(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(event.dataTransfer!.files);
    this.sortImages(event.dataTransfer!.files);
  }

  submit() {
    this.onChange(this.value);
    this.isOpen = false;
  }
}
