import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAdapters } from './component-adapters';

describe('ComponentAdapters', () => {
  let component: ComponentAdapters;
  let fixture: ComponentFixture<ComponentAdapters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentAdapters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentAdapters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
