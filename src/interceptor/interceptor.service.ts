import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('token'); // Use getItem instead of get
    if (jwt) {
      const headers = {
        Authorization: `Bearer ${jwt}`,
      };
      const authReq = req.clone({
        setHeaders: headers
      });

      return next.handle(authReq);
    } else {
      const headers = {
        Authorization: `Bearer ${jwt}`,
      };
      return next.handle(req);
    }
  }

  constructor() { }
}
