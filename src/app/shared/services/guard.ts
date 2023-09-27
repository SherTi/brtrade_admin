import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ServerResponse } from '../../types';
import { RequestService } from './request.service';
export function canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  const auth = localStorage.getItem('authorization');
  const router = inject(Router);
  if (!auth) {
    router
      .navigate(['sign-in'])
      .then((val) => {
        console.log(val);
      })
      .catch((e) => {
        console.log(e);
      });
    return false;
  }
  const http = inject(RequestService);
  return new Observable((subscriber) => {
    http.get<ServerResponse>('/api/auth/check').subscribe((res) => {
      if (res.status) {
        subscriber.next(true);
      } else {
        localStorage.clear();
        router.navigate(['sign-in']);
        subscriber.next(false);
      }
    });
  });
}
