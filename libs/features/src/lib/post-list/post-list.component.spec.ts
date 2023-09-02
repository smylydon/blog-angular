import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { FeaturesFacadeService } from '../+state/features-facade.service';
import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [
        {
          provide: FeaturesFacadeService,
          useValue: {
            posts$: of([]),
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
