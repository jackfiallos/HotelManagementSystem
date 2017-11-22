import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthService {
    private cachedRequests: Array<HttpRequest<any>> = [];

    /**
     * [collectFailedRequest description]
     * @method  collectFailedRequest
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {[type]} request [description]
     */
    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    /**
     * [retryFailedRequests description]
     * @method  retryFailedRequests
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     */
    public retryFailedRequests(): void {
        // Retry the requests, this method can be called after the token is refreshed
    }

    /**
     * [setToken description]
     * @method  setToken
     * @author jackfiallos
     * @version [version]
     * @date    2017-11-09
     * @return  {string} [description]
     */
    public setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    /**
     * [getToken description]
     * @method  getToken
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @return  {string} [description]
     */
    public getToken(): string {
        return localStorage.getItem('token');
    }

    /**
     * [isAuthenticated description]
     * @method  isAuthenticated
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @return  {boolean} [description]
     */
    public isAuthenticated(): boolean {
        const token = this.getToken();
        return false;
    }

    /**
     * [removeToken description]
     * @method  removeToken
     * @author jackfiallos
     * @version [version]
     * @date    2017-11-09
     */
    public removeToken(): void {
        localStorage.clear();
    }
}
