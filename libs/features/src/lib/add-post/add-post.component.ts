import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'lib-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  public postForm!: FormGroup; // eslint-disable-line
  private postTitle: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  private postAuthor: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  private postContent: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postTitle: this.postTitle,
      postAuthor: this.postAuthor,
      postContent: this.postContent,
    });
  }

  submit() {
    // const transaction: TransactionsEntity = this.expensesForm
    //   .value as TransactionsEntity;
    // this.store.dispatch(addTransaction({ model: transaction }));
  }
}
