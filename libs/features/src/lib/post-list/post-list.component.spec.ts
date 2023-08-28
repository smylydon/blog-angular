import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [
        {
          provide: Store,
          useValue: {
            select: () => {},
            dispatch: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
