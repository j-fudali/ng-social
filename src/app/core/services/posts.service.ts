import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Post } from 'src/app/shared/interfaces/posts/post';
import { PaginatedResponse } from 'src/app/shared/interfaces/paginated-response';
import { NewPost } from 'src/app/shared/interfaces/posts/new-post';
import { CookieService } from 'ngx-cookie-service';
import { Reaction } from 'src/app/shared/interfaces/reactions/reactions';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = environment.url + '/posts';
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private authService = inject(AuthService);
  public getAllPublicPosts(page = 1, limit = 4) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<PaginatedResponse<Post>>(this.baseUrl, {
      params,
    });
  }
  public getAllPrivatePosts() {}
  public getAllPostsByGroup() {}
  public searchPosts() {}

  public addPost(post: NewPost) {
    const token = this.cookies.get('token');
    const request = this.http.post<{ postId: string; message: string }>(
      this.baseUrl,
      {
        title: post.title,
        text: post.text,
        visibility: post.visibility,
        categories: post.categories,
      },
      {
        headers: this.authService.getHeaders(),
      }
    );
    return post.files.length > 0
      ? request.pipe(
          switchMap(({ postId }) => this.uploadFiles(postId, post.files))
        )
      : request;
  }
  private uploadFiles(postId: string, files: FileList) {
    const token = this.cookies.get('token');
    const formdata = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('files', files[i], files[i].name);
    }

    return this.http.post(this.baseUrl + '/' + postId + '/upload', formdata, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  public addReaction(postId: string, reaction: string): Observable<Reaction> {
    return this.http.post<Reaction>(
      this.baseUrl + '/' + postId + '/reactions',
      {
        reaction,
      },
      { headers: this.authService.getHeaders() }
    );
  }
}
