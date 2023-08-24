import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/shared/interfaces/login/login-credentials';
import { LoginResponse } from 'src/app/shared/interfaces/login/login-response';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.url + '/auth';

  login(loginCredentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.baseUrl + '/login',
      loginCredentials
    );
  }
  register() {}
}
