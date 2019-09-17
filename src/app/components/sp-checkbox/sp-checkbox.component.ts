import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Size } from '../../models/viewModels';
import { Router } from '@angular/router';
@Component({
  selector: 'gc-sp-checkbox',
  templateUrl: './sp-checkbox.component.html',
  styleUrls: ['./sp-checkbox.component.scss']
})
export class SpCheckboxComponent implements OnInit , OnChanges {

  @Input() size: Size;
  @Input() selectedValues: any;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  messages = false;
  banGuid: boolean;
  @Output() selected = new EventEmitter<any>();
  didSelect = false;
  ngOnInit() {
    this.router.url === '/messages' ? this.messages = true : this.messages = false;
    this.router.url === '/banGuid' ? this.banGuid = true : this.banGuid = false;
  }

  constructor(private router: Router) {
  }
  
  ngOnChanges() {
   
  }

  toggleVisibility() {
    // this.size.enabled = e.target.checked
    this.selected.emit(this.size);
  }
}
