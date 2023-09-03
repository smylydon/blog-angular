import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Update } from '@ngrx/entity';

import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { PostActions } from '../+state';
import { Post } from '../+state/post/post.model';

import { UserEntity } from '../+state/user/user.model';
import { FeaturesFacadeService } from '../+state/features-facade.service';

@Component({
  selector: 'lib-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostComponent implements OnInit, OnDestroy {
  public users$: Observable<UserEntity[]> = this.facade.justUsers$;
  public editForm!: FormGroup; // eslint-disable-line
  private postId: FormControl = new FormControl(0, [Validators.required]);
  private postTitle: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  private postAuthor: FormControl = new FormControl('', [Validators.required]);
  private postContent: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);
  private subscription: Subscription = new Subscription();

  constructor(
    private activedRoute: ActivatedRoute,
    private facade: FeaturesFacadeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      postId: this.postId,
      postTitle: this.postTitle,
      postAuthor: this.postAuthor,
      postContent: this.postContent,
    });

    this.subscription.add(
      this.facade
        .postFromRouteOrId(this.activedRoute)
        .pipe(
          filter((post: Post | undefined) => {
            return post !== undefined;
          })
        )
        .subscribe((post: Post | undefined) => {
          this.postId.setValue(post?.id);
          this.postAuthor.setValue(post?.userId);
          this.postContent.setValue(post?.body);
          this.postTitle.setValue(post?.title);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deletePost(event: Event) {
    event.stopImmediatePropagation();
    const post = this.editForm.value;
    const post_id = Number(post.postId);
    this.facade.dispatch(PostActions.deletePost({ post_id }));
  }

  submit() {
    const post = this.editForm.value;
    const updatedPost: Update<Post> = <Update<Post>>{
      id: Number(post.postId),
      changes: {
        title: post.postTitle,
        userId: post.postAuthor,
        body: post.postContent,
      },
    };
    this.facade.dispatch(PostActions.updatePost({ update: updatedPost }));
  }

  trackBy(index: number, user: UserEntity) {
    return user.id;
  }
}
