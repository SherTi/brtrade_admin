import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServerResponse } from '../../types';
import { MessageStream } from '../streams/message.stream';
import { v4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private http: HttpClient) {}

  get<T = null>(url: string): Observable<ServerResponse<T>> {
    const token = localStorage.getItem('authorization');
    let headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return new Observable<ServerResponse<T>>((observer) => {
      this.http
        .get<ServerResponse<T>>(`${environment.api}${url}`, {
          headers,
        })
        .subscribe({
          next: (value) => {
            if (!value.status) {
              MessageStream.createMessage({
                id: v4(),
                error: true,
                message: value.message,
              });
            }
            observer.next(value);
          },
          error: (e) => {
            console.log(e);
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
          },
        });
    });
  }

  post<T = null>(url: string, body: any): Observable<ServerResponse<T>> {
    const token = localStorage.getItem('authorization');
    let headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return new Observable<ServerResponse<T>>((observer) => {
      this.http
        .post<ServerResponse<T>>(`${environment.api}${url}`, body, { headers })
        .subscribe({
          next: (value) => {
            if (!value.status) {
              MessageStream.createMessage({
                id: v4(),
                error: true,
                message: value.message,
              });
            }
            observer.next(value);
          },
          error: (e) => {
            console.log(e);
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
          },
        });
    });
  }
}
