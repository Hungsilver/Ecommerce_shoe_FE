import { inject } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { BaseAuthService } from './auth.service';
import { CacheService } from './cache.service';


export const authUserGuard = () => {
  const router = inject(Router);
  const authService = inject(BaseAuthService);
  const cacheService = inject(CacheService);
  if (cacheService.get('USER')) {
    return true;
  }
  router.navigate(['/'])
  return false;
};
export const authAdminGuard = () => {
  const router: Router = inject(Router);
  const authService = inject(BaseAuthService);
  const cacheService = inject(CacheService);
  if (cacheService.get('ADMIN')) {
    return true;
  }
  router.navigate(['/auth/login-admin'])
  return false;
};


