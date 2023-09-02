import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeAgoComponent } from './time-ago.component';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';

describe('TimeAgoComponent', () => {
  let component: TimeAgoComponent;
  let fixture: ComponentFixture<TimeAgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeAgoComponent, TimeAgoPipe],
      providers: [TimeAgoPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeAgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
