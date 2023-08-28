import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PostEffects } from './post.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../services/api.service';

describe('PostEffects', () => {
  let actions$: Observable<any>;
  let effects: PostEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: {} },
        HttpClientTestingModule,
        PostEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(PostEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
