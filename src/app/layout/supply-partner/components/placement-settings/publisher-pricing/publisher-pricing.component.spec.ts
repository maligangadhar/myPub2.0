import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherPricingComponent } from './publisher-pricing.component';

describe('PublisherPricingComponent', () => {
  let component: PublisherPricingComponent;
  let fixture: ComponentFixture<PublisherPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
