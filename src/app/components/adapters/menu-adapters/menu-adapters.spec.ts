import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdapters } from './menu-adapters';

describe('MenuAdapters', () => {
  let component: MenuAdapters;
  let fixture: ComponentFixture<MenuAdapters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAdapters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAdapters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
