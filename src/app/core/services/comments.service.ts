import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Comment } from 'src/app/shared/interfaces/comments/comment';
import { PaginatedResponse } from 'src/app/shared/interfaces/paginated-response';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = environment.url + '/comments';
  public getCommentsRelatedToPost(
    postId: string
  ): Observable<PaginatedResponse<Comment>> {
    const params = new HttpParams().set('postId', postId);
    return this.http.get<PaginatedResponse<Comment>>(this.baseUrl, { params });
  }
  public addComment(text: string, postId: string, image?: File) {
    const request = this.http.post<Comment>(
      this.baseUrl,
      { text, postId },
      { headers: this.authService.getHeaders() }
    );
    return image
      ? request.pipe(
          switchMap((comment) =>
            this.uploadImages(comment._id, image).pipe(
              map(({ url }) => ({ ...comment, image: url }))
            )
          )
        )
      : request;
  }
  private uploadImages(commentId: string, image: File) {
    return this.http.post<{ url: string }>(
      this.baseUrl + '/' + commentId + '/upload',
      {
        image,
      }
    );
  }
}
