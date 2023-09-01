import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Subject, Subscription, merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post, Reactions, UpdateObject } from '../+state/post/post.model';
import { PostActions } from '../+state/post/post.actions';
import { ActivatedRoute, Data } from '@angular/router';
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
    const postId = this.activedRoute.snapshot.params['id'];
    const routedPost$ = this.activedRoute.data.pipe(
      map((data: Data) => {
        const post = undefined;

        if (data && data['routeResolver']) {
          this.post = data['routeResolver'];
        }
        return post;
      })
    );

    const postSubject: Subject<Post | undefined> = new BehaviorSubject<
      Post | undefined
    >(undefined);

    this.subscription.add(
      postSubject
        .asObservable()
        .subscribe((post: Post | undefined) => (this.post = post))
    );

    this.subscription.add(
      merge(routedPost$, this.facade.currentPostById(postId)).subscribe(
        postSubject
      )
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
