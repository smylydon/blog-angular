import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { UserState } from '../+state/user/user.reducer';
import { PostActions } from '../+state/post/post.actions';
import { NewPost } from '../+state/post/post.model';

import { UserEntity } from '../+state/user/user.model';
import { getAllUsers } from '../+state/user/user.selectors';
import { UserActions } from '../+state/user/user.actions';

@Component({
  selector: 'lib-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostComponent {
  public users$: Observable<UserEntity[]> = this.store.select(getAllUsers);
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

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      postTitle: this.postTitle,
      postAuthor: this.postAuthor,
      postContent: this.postContent,
    });
    this.store.dispatch(PostActions.loadPosts());
    this.store.dispatch(UserActions.loadUsers());
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
