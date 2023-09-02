import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostEntity } from '../+state/post/post.model';
import { UserEntity } from '../+state/user/user.model';

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

  public getUsers(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>('users').pipe(
      map((response) => {
        return response as UserEntity[];
      })
    );
  }
}
