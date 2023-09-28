import { Observable, Subject, Subscription } from 'rxjs';
import { GalleryItem, ServerResponse } from '../../types';
import { Observer } from 'rxjs';
import { inject } from '@angular/core';
import { RequestService } from '../services/request.service';

export class GalleryStream {
  private static _subject: Subject<GalleryItem[]> = new Subject<
    GalleryItem[]
  >();
  private static _gallery: GalleryItem[] = [];
  static subscribe(
    observerOrNext?:
      | Partial<Observer<GalleryItem[]>>
      | ((value: GalleryItem[]) => void),
  ): Subscription {
    return this._subject.subscribe(observerOrNext);
  }
  static get current(): GalleryItem[] {
    return this._gallery;
  }
  static set current(value) {
    this._gallery = value;
    this._subject.next(value);
  }

  static init(value: GalleryItem[]): void {
    this.current = value;
  }
}
