import { inject } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { BaseAuthService } from './auth.service';
import { CacheService } from './cache.service';
// import { IRoleGuard } from '../../../libs/common/interface/interfaces'


export const authUserGuard = () => {
  const router = inject(Router);
  // const authService = inject(BaseAuthService);
  // const cacheService = inject(CacheService);
  // if (!cacheService.get('customer')) {
  //   router.navigate(['/'])
  //   return false;
  // } else {
  //   return true;
  // }
  console.log('runn auth user')
  router.navigate(['/'])
  return false;
};
export const authAdminGuard = () => {
  const router: Router = inject(Router);
  const authService = inject(BaseAuthService);
  const cacheService = inject(CacheService);
  if (cacheService.get('admin')) {
    return true;
  }
  router.navigate(['/auth/login-admin'])
  return false;
};


