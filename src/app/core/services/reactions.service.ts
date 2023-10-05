import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Reaction } from 'src/app/shared/interfaces/reactions/reactions';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReactionsService {
  private http = inject(HttpClient);
  private baseUrl = environment.url + '/reactions';
  private authService = inject(AuthService);
  public updateReaction(id: string, reaction: string) {
    return this.http.patch<Reaction>(
      this.baseUrl + '/' + id,
      { reaction },
      { headers: this.authService.getHeaders() }
    );
  }
  public deleteReaction(id: string) {
    return this.http.delete(this.baseUrl + '/' + id, {
      headers: this.authService.getHeaders(),
    });
  }
}
