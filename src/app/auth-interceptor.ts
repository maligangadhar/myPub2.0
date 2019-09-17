import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const appToken = environment.appToken;
    const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + appToken + ':' + localStorage.getItem('token')) });
    // const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token')) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
