import { Component, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { AvBase } from '../shared/base';

@Component({
  selector: 'av-spinner',
  templateUrl: './spinner.html',
  host: { 'class': 'av-spinner' },
  encapsulation: ViewEncapsulation.None
})
export class AvSpinnerComponent extends AvBase {
  constructor(renderer: Renderer2, element: ElementRef) {
    super(renderer, element);
  }
}
