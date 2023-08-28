import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostEntity, Post } from '../+state/post/post.model';
import { getAllPosts } from '../+state/post/post.selectors';
import { PostActions } from '../+state/post/post.actions';

import { UserEntity } from '../+state/user/user.model';
import { getAllUsers } from '../+state/user/user.selectors';
import { UserActions } from '../+state/user/user.actions';

@Component({
  selector: 'lib-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  public posts$: Observable<PostEntity[]> = this.store.select(getAllPosts);
  public users$: Observable<UserEntity[]> = this.store.select(getAllUsers);
  public output$: Observable<Post[]>;

  constructor(private store: Store) {
    this.output$ = combineLatest([this.posts$, this.users$]).pipe(
      map(([posts, users]: [PostEntity[], UserEntity[]]) => {
        return <Post[]>posts.map((post: PostEntity) => {
          const userId = Number(post.userId);
          const author: UserEntity | undefined = users?.find(
            (user: UserEntity) => user.id === userId
          );
          return <Post>{
            ...post,
            name: author?.name || 'Unknown author',
          };
        });
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(PostActions.intializePosts());
    this.store.dispatch(UserActions.intializeUsers());
  }

  public trackBy(index: number, post: PostEntity) {
    return post.id;
  }
}
