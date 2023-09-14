import { ChangeDetectionStrategy } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Subject, of } from 'rxjs';

import { FeaturesFacadeService } from '../+state/features-facade.service';
import { Post } from '../+state/post/post.model';
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
      imports: [PostListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
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

  it('should not show any lib-a-post', () => {
    const selected = compiled.querySelectorAll('lib-a-post');
    expect(selected.length).toBe(0);
  });

  it('should show 100 lib-a-post', () => {
    posts$.next(posts);
    fixture.detectChanges();
    const selected = compiled.querySelectorAll('lib-a-post');
    expect(selected.length).toBe(100);
  });
});
