import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { PublicUser } from 'src/app/shared/interfaces/user/public-user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = environment.url + '/users';
  private cookies = inject(CookieService);
  constructor() {}
  public getUserId() {
    return this.cookies.get('userId');
  }
  public getUserByUsername(username: string): Observable<PublicUser> {
    return this.http.get<PublicUser>(this.baseUrl + '/byUsername/' + username);
  }
  public getUserByEmail(email: string): Observable<PublicUser> {
    return this.http.get<PublicUser>(this.baseUrl + '/byEmail/' + email);
  }
}
