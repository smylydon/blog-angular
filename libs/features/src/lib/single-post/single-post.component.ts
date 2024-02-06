import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Post, Reactions, UpdateObject } from '../+state/post/post.model';
import { PostActions } from '../+state/post/post.actions';
import { FeaturesFacadeService } from '../+state/features-facade.service';
import { APostComponent } from '../a-post/a-post.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [APostComponent, AsyncPipe],
})
export class SinglePostComponent {
  public post$: Observable<Post | undefined> = this.facade.postFromRouteOrId(
    this.activedRoute
  );

  constructor(
    private activedRoute: ActivatedRoute,
    private facade: FeaturesFacadeService
  ) {}

  public emitPost(updateObject: UpdateObject) {
    const post: Post = updateObject.post;
    const emoji: Reactions = updateObject.value;
    const reactions = {
      ...post.reactions,
    };
    reactions[emoji] = post.reactions[emoji] + 1;

    this.facade.dispatch(
      PostActions.updateReaction({
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
