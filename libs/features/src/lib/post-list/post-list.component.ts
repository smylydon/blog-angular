import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Post, Reactions, UpdateObject } from '../+state/post/post.model';
import { PostActions } from '../+state/post/post.actions';

import { FeaturesFacadeService } from '../+state/features-facade.service';
import { APostComponent } from '../a-post/a-post.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [APostComponent, AsyncPipe],
})
export class PostListComponent {
  public posts$: Observable<Post[]> = this.facade.posts$;

  constructor(private facade: FeaturesFacadeService) {}

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
