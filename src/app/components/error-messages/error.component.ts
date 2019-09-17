import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gc-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() type: string;
  @Input() msg: string;
  
  constructor() { }

  ngOnInit() {
    
  }

}
