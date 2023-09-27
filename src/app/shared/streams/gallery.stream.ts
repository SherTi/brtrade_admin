import { Subject, Subscription } from 'rxjs';
import { GalleryItem } from '../../types';
import { Observer } from 'rxjs';
import axios from 'axios';

export class GalleryStream {
  private static _subject: Subject<GalleryItem[]> = new Subject<
    GalleryItem[]
  >();
  private static _gallery: GalleryItem[] = [
    {
      id: 'asdfasdf',
      name: 'Тракторк',
      width: 150,
      height: 123,
      src: '/assets/image.jpg',
      size: 255,
      createdAt: '1',
      updatedAt: '1',
    },
    {
      id: 'asdfasgr',
      name: 'Тракторк',
      width: 150,
      height: 123,
      src: '/assets/image.jpg',
      size: 255,
      createdAt: '2',
      updatedAt: '2',
    },
  ];
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

  static async init() {
    const res = await axios.get('http://localhost:4000/api/');
  }
}
