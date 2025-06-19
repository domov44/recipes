import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionText } from './section-text';

describe('SectionText', () => {
  let component: SectionText;
  let fixture: ComponentFixture<SectionText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
