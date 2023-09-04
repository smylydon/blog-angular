import { Injectable } from '@angular/core';
import { Post, PostEntity } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}
  convertPostEntityToPost(postEntities: PostEntity[] = []): Post[] {
    return postEntities.map((data: PostEntity) => {
      const post: Post = <Post>{
        ...data,
        date: new Date().toISOString(),
        reactions: {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        },
      };

      return post;
    });
  }
}
