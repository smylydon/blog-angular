import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { FeaturesFacadeService } from '../+state/features-facade.service';
import { EditPostComponent } from './edit-post.component';

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, EditPostComponent],
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
            postFromRouteOrId: () => of(undefined),
            justUsers$: of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
