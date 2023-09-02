import { TestBed } from '@angular/core/testing';
import { FeaturesModule } from './features.module';

describe('FeaturesModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesModule],
    }).compileComponents();
  });

  it('should create', () => {
    expect(FeaturesModule).toBeDefined();
  });
});
