import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBackgroundImage } from './hero-background-image';

describe('HeroBackgroundImage', () => {
  let component: HeroBackgroundImage;
  let fixture: ComponentFixture<HeroBackgroundImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBackgroundImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroBackgroundImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
