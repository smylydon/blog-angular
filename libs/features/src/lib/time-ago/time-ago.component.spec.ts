import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeAgoComponent } from './time-ago.component';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';

describe('TimeAgoComponent', () => {
  let compiled: HTMLElement;
  let component: TimeAgoComponent;
  let fixture: ComponentFixture<TimeAgoComponent>;
  const MINUTE = 60 * 1000;
  const TWO_HOURS = 2 * 60 * MINUTE;
  const ONE_DAY = 12 * TWO_HOURS;
  const getISOStringDate = (period: number) => {
    const time = new Date().getTime() - period;
    return new Date(time).toISOString();
  };

  const testTime = (value: number, returnedValue: RegExp) => {
    const timestamp = getISOStringDate(value);
    component.timestamp = timestamp;
    fixture.detectChanges();

    const span = compiled.querySelector('span');
    const italics = span?.querySelector('i');
    expect(italics?.textContent).toMatch(returnedValue);
    expect(span?.hasAttribute('title')).toBe(true);
    expect(span?.getAttribute('title')).toBe(timestamp);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeAgoComponent, TimeAgoPipe],
      providers: [],
    })
      .overrideComponent(TimeAgoComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TimeAgoComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return - less than a minute ago', () => {
    testTime(0, /less than a minute ago/);
  });

  it('should return - 1 minute ago', () => {
    testTime(MINUTE, /1 minute ago/);
  });

  it('should return - 2 hour ago', () => {
    testTime(TWO_HOURS, /2\s+hours\s+ago/);
  });

  it('should return - 1 day ago', () => {
    testTime(ONE_DAY, /1\s+day\s+ago/);
  });
});
