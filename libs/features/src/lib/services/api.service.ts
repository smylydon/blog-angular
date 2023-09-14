import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewPost, Post, PostEntity } from '../+state/post/post.model';
import { UserEntity } from '../+state/user/user.model';
import { Update } from '@ngrx/entity';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private helper: HelperService) {}

  public getPosts(): Observable<Post[]> {
    return this.http.get<PostEntity[]>('posts').pipe(
      map((response) => {
        return this.helper.convertPostEntityToPost(response as PostEntity[]);
      })
    );
  }

  public deletePost(post_id: number): Observable<number> {
    return this.http.delete<number>(`posts/${post_id}`).pipe(
      map(() => {
        return post_id;
      })
    );
  }

  public savePost(post: NewPost): Observable<Post> {
    return this.http.post<PostEntity>('posts', JSON.stringify(post)).pipe(
      map((data: { id: number }) => {
        const postEntity: PostEntity = {
          ...post,
          id: data.id,
        };
        const posts: Post[] = this.helper.convertPostEntityToPost([postEntity]);
        return posts[0];
      })
    );
  }
  public updatePost(update: Update<Post>): Observable<Update<Post>> {
    return this.http
      .put<PostEntity>(`posts/${update.id}`, JSON.stringify(update.changes))
      .pipe(
        map(() => {
          return update;
        })
      );
  }

  public getUsers(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>('users').pipe(
      map((response) => {
        return response as UserEntity[];
      })
    );
  }
}
