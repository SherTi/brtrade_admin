import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GalleryItem } from '../../../types';
import { GalleryStream } from '../../streams/gallery.stream';

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
  @Input() modalState: boolean = false;
  @Output() modalStateChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() limit: number = 1;
  @Input() disabled = false;

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
  active: boolean = false;

  onClick(item: any) {
    const filtered = this.items.filter((i) => {
      return !!i.selected;
    });

    if (this.limit == 1 && (filtered.length == 1 || filtered.length == 0)) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].selected = false;
      }
      item.selected = true;
      this.value = this.items.filter((i) => {
        return !!i.selected;
      });
      this.onChange(this.value);
    } else if (filtered.length < this.limit) {
      item.selected = true;
      this.value = this.items.filter((i) => {
        return !!i.selected;
      });
      this.onChange(this.value);
    }
  }

  closeModal(event: MouseEvent) {
    if (
      (event.target as Element).classList.contains('modal-window-background')
    ) {
      this.modalStateChange.emit(false);
    }
  }

  private _subscription?: Subscription;

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.items = GalleryStream.current;
    this._subscription = GalleryStream.subscribe((value) => {
      this.items = value;
    });
  }
}
