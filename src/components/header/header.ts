import { Component, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class Header {

  @Input() title:string;

  constructor() {
  }

}
