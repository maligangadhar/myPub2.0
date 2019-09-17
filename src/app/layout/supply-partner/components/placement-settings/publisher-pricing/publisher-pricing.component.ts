import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gc-publisher-pricing',
  templateUrl: './publisher-pricing.component.html',
  styleUrls: ['./publisher-pricing.component.scss']
})
export class PublisherPricingComponent implements OnInit {

  publisher_tier_1: number = 1.5;
  publisher_tier_2: number = 1;
  publisher_tier_3: number = 0.75;

  @Input() publisherDetails;
  @Output() publiserPricingData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * tier 1 changes
   */
  tier_change = () => {
    this.publiserPricingData.emit(this.publisherDetails);
  }

}
