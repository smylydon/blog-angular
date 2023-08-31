import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Post, Reactions, UpdateObject } from '../+state/post/post.model';
import { PostActions } from '../+state/post/post.actions';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'lib-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostComponent implements OnInit, OnDestroy {
  public post: Post | undefined;

  private subscription: Subscription = new Subscription();

  constructor(
    private activedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    const data = this.activedRoute.snapshot.data;
    this.post = undefined;

    if (data && data['routeResolver']) {
      this.post = data['routeResolver'];
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public emitPost(updateObject: UpdateObject) {
    const post: Post = updateObject.post;
    const emoji: Reactions = updateObject.value;
    const reactions = {
      ...post.reactions,
    };
    reactions[emoji] = post.reactions[emoji] + 1;

    this.store.dispatch(
      PostActions.updatePost({
        update: {
          id: post.id,
          changes: {
            reactions,
          },
        },
      })
    );
  }
}
