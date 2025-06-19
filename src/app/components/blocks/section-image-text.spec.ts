import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionImageText } from './section-image-text';

describe('SectionImageText', () => {
  let component: SectionImageText;
  let fixture: ComponentFixture<SectionImageText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionImageText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionImageText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
