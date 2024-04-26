import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated()){
    return true;
  }

  router.parseUrl('/login');
  return false;
}

export const guestGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isAuthenticated()){
    return true;
  }

  router.parseUrl('/app/chats');
  return false;
}
