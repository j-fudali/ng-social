import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const startGuard: CanActivateFn = (route, state) => {
  const cookies = inject(CookieService);
  const location = inject(Location);
  const router = inject(Router);
  if (!cookies.check('token')) return true;
  router.navigate(['/home']);
  return false;
};
