import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/shared/interfaces/login/login-credentials';
import { LoginResponse } from 'src/app/shared/interfaces/login/login-response';
import { SignUpResponse } from 'src/app/shared/interfaces/sign-up/sign-up-response';
import { SingUpCredentials } from 'src/app/shared/interfaces/sign-up/sing-up-credentials';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.url + '/auth';

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + '/login', credentials);
  }
  register(credentials: SingUpCredentials): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(
      this.baseUrl + '/register',
      credentials
    );
  }
  getErrorMessage(errorCode: number) {
    switch (errorCode) {
      case 401:
        return 'Unauthorized access';
      case 404:
        return 'User not found';
      default:
        return 'Unknow error. Please try again later.';
    }
  }
}
