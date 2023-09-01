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

import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NewPost, Post } from '../+state/post/post.model';

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
          this.postAuthor.setValue(post?.userId);
          this.postContent.setValue(post?.body);
          this.postTitle.setValue(post?.title);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    const post = this.editForm.value;
    const newPost: NewPost = {
      title: post.postTitle,
      userId: post.postAuthor,
      body: post.postContent,
    };
    // this.store.dispatch(PostActions.savePost({ post: newPost }));
  }

  trackBy(index: number, user: UserEntity) {
    return user.id;
  }
}
