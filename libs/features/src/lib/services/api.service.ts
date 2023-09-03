import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewPost, Post, PostEntity } from '../+state/post/post.model';
import { UserEntity } from '../+state/user/user.model';
import { Update } from '@ngrx/entity';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  public getPosts(): Observable<PostEntity[]> {
    return this.http.get<PostEntity[]>('posts').pipe(
      map((response) => {
        return response as PostEntity[];
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

  public savePost(post: NewPost): Observable<PostEntity> {
    return this.http.post<PostEntity>('posts', JSON.stringify(post)).pipe(
      map((data: { id: number }) => {
        return <PostEntity>{
          ...post,
          id: data.id,
        };
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
