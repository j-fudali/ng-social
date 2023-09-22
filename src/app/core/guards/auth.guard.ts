import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = () => {
  const cookies = inject(CookieService);
  const router = inject(Router);
  return cookies.check('token') ? true : router.navigate(['/start']);
};
