import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Redux Blog');
  });

  it(`should have as title 'blog'`, () => {
    expect(component.title).toEqual('blog');
  });

  it('should render 2 menu items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const selected = compiled.querySelectorAll('a');
    expect(selected[0]?.textContent).toContain('Home');
    expect(selected[1]?.textContent).toContain('Post');
  });
});
