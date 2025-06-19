import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeatures } from './list-features';

describe('ListFeatures', () => {
  let component: ListFeatures;
  let fixture: ComponentFixture<ListFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFeatures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFeatures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
