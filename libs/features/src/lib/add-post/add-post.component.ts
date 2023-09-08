import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';

import { PostActions } from '../+state';
import { NewPost } from '../+state/post/post.model';

import { UserEntity } from '../+state/user/user.model';
import { FeaturesFacadeService } from '../+state/features-facade.service';

@Component({
  selector: 'lib-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostComponent implements OnInit {
  public users$: Observable<UserEntity[]> = this.facade.justUsers$;
  public postForm!: FormGroup; // eslint-disable-line
  private postTitle: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  private postAuthor: FormControl = new FormControl('', [Validators.required]);
  private postContent: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private facade: FeaturesFacadeService
  ) {}

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postTitle: this.postTitle,
      postAuthor: this.postAuthor,
      postContent: this.postContent,
    });
  }

  submit() {
    const post = this.postForm.value;
    const newPost: NewPost = {
      title: post.postTitle,
      userId: post.postAuthor,
      body: post.postContent,
    };
    this.postForm.reset();
    this.facade.dispatch(PostActions.savePost({ post: newPost }));
  }

  trackBy(index: number, user: UserEntity) {
    return user.id;
  }
}
