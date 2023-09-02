import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactionButtonsComponent } from './reaction-buttons.component';
import { ReactionButtonCountPipe } from '../pipes/reaction-button-count.pipe';

describe('ReactionButtonsComponent', () => {
  let component: ReactionButtonsComponent;
  let fixture: ComponentFixture<ReactionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactionButtonsComponent, ReactionButtonCountPipe],
      providers: [ReactionButtonCountPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
