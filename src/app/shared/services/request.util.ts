import axios from 'axios';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../types';
import { MessageStream } from '../streams/message.stream';
import { v4 } from 'uuid';

export function getUtil<T = null>(url: string): Observable<ServerResponse<T>> {
  return new Observable<ServerResponse<T>>((observer) => {
    const auth = localStorage.getItem('authorization');
    if (auth) {
      axios
        .get(`${environment.api}${url}`, {
          headers: { Authorization: `Bearer ${auth}` },
          validateStatus: () => {
            return true;
          },
        })
        .then((res) => {
          observer.next(res.data);
        })
        .catch(() => {
          MessageStream.createMessage({
            id: v4(),
            error: true,
            message:
              'Что-то пошло не так! Пожалуйста проверьте подключение к интернету!',
          });
          observer.next({
            status: false,
            message:
              'Что-то пошло не так! Пожалуйста проверьте подключение к интернету!',
            data: null,
          });
        });
    } else {
      MessageStream.createMessage({
        id: v4(),
        error: true,
        message: 'Вы не авторизованы!',
      });
      observer.next({
        status: false,
        message: 'Вы не авторизованы!',
        data: null,
      });
    }
  });
}
