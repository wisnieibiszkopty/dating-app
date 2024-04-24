import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree} from "@angular/router";


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {


  return true;
}
