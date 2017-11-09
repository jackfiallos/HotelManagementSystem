import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    /**
     * [canActivate description]
     * @method  canActivate
     * @author jackfiallos
     * @version [version]
     * @date    2017-11-09
     * @param   {[type]} route [description]
     * @param   {[type]} state [description]
     * @return  {[type]} [description]
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
