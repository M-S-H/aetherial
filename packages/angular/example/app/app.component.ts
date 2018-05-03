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
  names = names;

  items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  doStuff() {
    this.state = 'loading';
    setTimeout(() => {
      this.state = 'button';
    }, 3000);
  }
}
