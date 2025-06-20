import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHero } from './product-hero';

describe('ProductHero', () => {
  let component: ProductHero;
  let fixture: ComponentFixture<ProductHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
