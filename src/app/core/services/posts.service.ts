import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/interfaces/posts/post';
import { PaginatedResponse } from 'src/app/shared/interfaces/paginated-response';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = environment.url + '/posts';
  private http = inject(HttpClient);

  public getAllPublicPosts(page = 1, limit = 4) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<PaginatedResponse<Post>>(this.baseUrl, {
      params,
    });
  }
  public getAllPrivatePosts() {}
  public getAllPostsByGroup() {}
  public searchPosts() {}
}
