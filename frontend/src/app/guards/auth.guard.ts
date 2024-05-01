import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log(authService.isAuthenticated());

  if(authService.isAuthenticated()){
    return true;
  }

  return router.parseUrl('/login');
}

export const guestGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log(authService.isAuthenticated());

  if(!authService.isAuthenticated()){
    return true;
  }

  return router.parseUrl('/app/profile');
}

export const allDataProvidedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log("all data provided");
  console.log(authService.getUser().allDataProvide);

  if(authService.getUser().allDataProvide){
    return true;
  }

  return router.parseUrl('/app/user-details');
}
