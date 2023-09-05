import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/shared/interfaces/comments/comment';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);
  private baseUrl = environment.url + '/comments';

  public getCommentsRelatedToPost(postId: string): Observable<Comment[]> {
    const params = new HttpParams().set('postId', postId);
    return this.http.get<Comment[]>(this.baseUrl, { params });
  }
}
