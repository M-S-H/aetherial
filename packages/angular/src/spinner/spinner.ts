import { Component, Renderer2, ElementRef } from '@angular/core';
import { AvBase } from '../shared/base';

@Component({
  selector: 'av-spinner',
  templateUrl: './spinner.html',
  host: { 'class': 'av-spinner' }
})
export class AvSpinnerComponent extends AvBase {
  constructor(renderer: Renderer2, element: ElementRef) {
    super(renderer, element);
  }
}
