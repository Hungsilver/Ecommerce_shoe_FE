import { inject } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { CacheService } from './cache.service';
// import { IRoleGuard } from '../../../libs/common/interface/interfaces'


export const authUserGuard = () => {
  const router = inject(Router);
  const cacheService = inject(CacheService);
  if (!cacheService.get('customer')) {
    router.navigate(['/'])
    return false;
  } else {
    return true;
  }
  router.navigate(['/'])
  return false;
};
export const authStaffGuard = () => {
  const router: Router = inject(Router);
  const cacheService = inject(CacheService);
  if (cacheService.get('user')) {
    return true;
  }
  router.navigate(['/auth/login-admin'])
  return false;
};

export const authAdminGuard = () => {
  const router: Router = inject(Router);
  const cacheService = inject(CacheService);
  if (cacheService.get('admin')) {
    return true;
  }
  router.navigate(['/auth/login-admin'])
  return false;
};


