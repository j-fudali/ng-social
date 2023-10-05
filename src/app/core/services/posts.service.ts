import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  Observable,
  catchError,
  concatMap,
  exhaustMap,
  map,
  switchMap,
  throwError,
} from 'rxjs';
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
  public searchPosts(
    page = 1,
    limit = 4,
    search: string,
    visibility: 'public' | 'private' | 'group',
    groupId?: string
  ): Observable<PaginatedResponse<Post>> {
    const params = new HttpParams()
      .set('search', search)
      .set('visibility', visibility)
      .set('page', page)
      .set('limit', limit);
    if (groupId) {
      params.set('groupId', groupId);
    }
    return this.http.get<PaginatedResponse<Post>>(this.baseUrl, {
      params,
    });
  }

  public addPost(newPost: NewPost): Observable<Post> {
    const request = this.http.post<Post>(
      this.baseUrl,
      {
        title: newPost.title,
        text: newPost.text,
        visibility: newPost.visibility,
        categories: newPost.categories,
      },
      {
        headers: this.authService.getHeaders(),
      }
    );
    return newPost.files.length > 0
      ? request.pipe(
          switchMap((post) =>
            this.uploadFiles(post._id, newPost.files).pipe(
              map((res) => ({ ...post, files: res } as Post))
            )
          )
        )
      : request;
  }
  private uploadFiles(postId: string, files: File[]) {
    const formdata = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('files', files[i], files[i].name);
    }

    return this.http.post<{ url: string }[]>(
      this.baseUrl + '/' + postId + '/upload',
      formdata,
      {
        headers: this.authService.getHeaders(),
      }
    );
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
