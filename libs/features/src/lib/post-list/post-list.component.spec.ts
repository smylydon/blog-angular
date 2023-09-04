import { ChangeDetectionStrategy } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject, Subject, of } from 'rxjs';

import { FeaturesFacadeService } from '../+state/features-facade.service';
import { Post, PostEntity } from '../+state/post/post.model';
import { PostListComponent } from './post-list.component';
import { posts as PostsArray } from '../mocks/mockPosts';
import { HelperService } from './../services/index';

describe('PostListComponent', () => {
  let compiled: HTMLElement;
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  const helper = new HelperService();
  const posts$: Subject<Post[]> = new BehaviorSubject<Post[]>([]);
  const posts: Post[] = helper.convertPostEntityToPost(PostsArray);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [
        {
          provide: FeaturesFacadeService,
          useValue: {
            posts$: posts$.asObservable(),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(PostListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    posts$.next([]);
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show any articles', () => {
    const selected = compiled.querySelectorAll('article');
    expect(selected.length).toBe(0);
  });

  it('should show 100 articles', () => {
    posts$.next(posts);
    fixture.detectChanges();
    const selected = compiled.querySelectorAll('article');
    expect(selected.length).toBe(100);
  });
});
