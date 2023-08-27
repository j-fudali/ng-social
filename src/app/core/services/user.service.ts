import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicUser } from 'src/app/shared/interfaces/user/public-user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = environment.url + '/users';
  constructor() {}

  public getUserByUsername(username: string): Observable<PublicUser> {
    return this.http.get<PublicUser>(
      this.baseUrl + '/username/byUsername/' + username
    );
  }
  public getUserByEmail(email: string): Observable<PublicUser> {
    return this.http.get<PublicUser>(this.baseUrl + '/byEmail/' + email);
  }
}
