import { Subject, Observer, Subscription } from 'rxjs';

export class LoadingStream {
  private static _loading: boolean = false;
  private static _subject = new Subject<boolean>();

  static get loadingStatus() {
    return this._loading;
  }

  static set loadingStatus(value) {
    this._loading = value;
    this._subject.next(value);
  }

  static subscribe(
    observerOrNext?: Partial<Observer<boolean>> | ((value: boolean) => void),
  ): Subscription {
    return this._subject.subscribe(observerOrNext);
  }
}
