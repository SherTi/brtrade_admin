import { Observer, Subject, Subscription } from 'rxjs';
import { Message } from '../../types';

export class MessageStream {
  private static _subject = new Subject<Message>();
  static createMessage(message: Message) {
    this._subject.next(message);
  }

  static subscribe(
    observerOrNext?: Partial<Observer<Message>> | ((value: Message) => void),
  ): Subscription {
    return this._subject.subscribe(observerOrNext);
  }
}
