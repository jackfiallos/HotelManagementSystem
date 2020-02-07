import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthController {
    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-29
     * @param   {HttpClient} public http [description]
     * @return  {[type]} [description]
     */
    constructor(public http: HttpClient) {}

    /**
     * [login description]
     * @method  login
     * @author jackfiallos
     * @version [version]
     * @date    2017-11-09
     * @param   {any} data [description]
     * @return  {[type]} [description]
     */
    public login(data: any) {
        return this.http.post(environment.api_url + '/', data);
    }
}
