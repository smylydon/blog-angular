import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LayoutComponent],
    })
      .overrideComponent(LayoutComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Redux Blog');
  });

  it('should render 2 menu items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const selected = compiled.querySelectorAll('a');
    expect(selected[0]?.textContent).toContain('Home');
    expect(selected[1]?.textContent).toContain('Post');
  });
});
