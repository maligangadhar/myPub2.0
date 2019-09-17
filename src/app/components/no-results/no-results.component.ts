import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gc-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss']
})
export class NoResultsComponent implements OnInit {

  @Input() displaySiteDetails;
  @Input() globalSearchText: string;
  @Input() rowCount: number;
  @Input() searchText: string;
  constructor() { }

  ngOnInit() {
  }

}
