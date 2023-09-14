import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APostComponent } from './a-post.component';

describe('APostComponent', () => {
  let component: APostComponent;
  let fixture: ComponentFixture<APostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [APostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(APostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
