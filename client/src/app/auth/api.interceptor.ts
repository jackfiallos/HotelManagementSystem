import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './authService';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {AuthService} publicauth [description]
     * @return  {[type]} [description]
     */
    constructor(public auth: AuthService, private _router: Router) {}

    /**
     * [intercept description]
     * @method  intercept
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {HttpRequest<any>} request [description]
     * @param   {HttpHandler} next [description]
     * @return  {Observable} [description]
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this.auth.getToken();

        // Add it if we have one
        if (token) {
            request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        // If this is a login-request the header is already set to x/www/formurl/encoded.
        // so if we already have a content-type, do not set it, but if we don't have one, set it to
        // default --> json
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                headers: request.headers.set('Content-Type', 'application/json')
            });
        }

        const started = Date.now();
        // return next.handle(request);
        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                const elapsed = Date.now() - started;
                console.log(`Request for ${request.urlWithParams} took ${elapsed} ms.`);
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.auth.collectFailedRequest(request);
                } else if (err.status === 403) {
                    this.auth.collectFailedRequest(request);
                    // Redirect to the login route or show a modal
                    this.auth.removeToken();
                    this._router.navigate(['/']);
                }
            }
        }));
    }
}
