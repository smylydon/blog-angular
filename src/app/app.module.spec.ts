import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';

describe('FeaturesModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    expect(AppModule).toBeDefined();
  });
});
