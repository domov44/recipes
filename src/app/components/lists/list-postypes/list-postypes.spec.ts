import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostypes } from './list-postypes';

describe('ListPostypes', () => {
  let component: ListPostypes;
  let fixture: ComponentFixture<ListPostypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPostypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPostypes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
