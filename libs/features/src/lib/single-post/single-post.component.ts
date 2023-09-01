import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Post, Reactions, UpdateObject } from '../+state/post/post.model';
import { PostActions } from '../+state/post/post.actions';
import { FeaturesFacadeService } from '../+state/features-facade.service';

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
    private facade: FeaturesFacadeService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.facade
        .postFromRouteOrId(this.activedRoute)
        .subscribe((post: Post | undefined) => (this.post = post))
    );
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

    this.facade.dispatch(
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
