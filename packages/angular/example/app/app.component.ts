import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  state = 'button';
  showModal = false;
  stuff = 'dfsa';
  items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  cool = null;
  radioModel = 'one';

  objectItems = [
    {id: 1, value: 'one'},
    {id: 2, value: 'two'},
    {id: 3, value: 'three'}
  ];

  doStuff() {
    this.state = 'loading';
    setTimeout(() => {
      this.state = 'button';
    }, 3000);
  }

  dothestuff() {
    // this.cool = 3;
    this.cool = { id: 3, value: 'three' };
  }
}
