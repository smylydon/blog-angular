import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPostComponent } from './add-post.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('AddPostComponent', () => {
  let compiled: HTMLElement;
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let postForm: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    postForm = component.postForm;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 labels', () => {
    const selected = compiled.querySelectorAll('label');
    expect(selected[0]?.textContent).toContain('Post Title:');
    expect(selected[1]?.textContent).toContain('Author:');
    expect(selected[2]?.textContent).toContain('Content:');
  });

  it('should have a disabled submit button and form should be invalid', () => {
    const selected = compiled.querySelector('button[type=submit]');
    expect(selected?.hasAttribute('disabled')).toBe(true);
    expect(postForm.invalid).toBe(true);
  });

  it('should have empty properties', () => {
    const author = postForm.controls['postAuthor'];
    const content = postForm.controls['postContent'];
    const title = postForm.controls['postTitle'];
    expect(author.valid).toBeFalsy();
    expect(content.valid).toBeFalsy();
    expect(title.valid).toBeFalsy();
  });

  it('should enable save button when all 3 properties are filled in', () => {
    const author = postForm.controls['postAuthor'];
    const content = postForm.controls['postContent'];
    const title = postForm.controls['postTitle'];

    expect(author.valid).toBeFalsy();
    expect(content.valid).toBeFalsy();
    expect(title.valid).toBeFalsy();

    author.setValue('A.N. Author');
    content.setValue('Some Content');
    title.setValue('A Title');
    fixture.detectChanges();

    expect(author.valid).toBeTruthy();
    expect(content.valid).toBeTruthy();
    expect(title.valid).toBeTruthy();

    const selected = compiled.querySelector('button[type=submit]');
    expect(selected?.hasAttribute('disabled')).toBe(false);
    expect(postForm.invalid).toBe(false);
  });
});
