import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { ColorPalette } from '../shared/color';

@Directive({
  selector: '[avButtonState]',
  host: {
    'class': 'button-state'
  }
})
export class AvButtonStateDirective {
  @Input() color: ColorPalette;
  @Input() state: string;

  constructor() {
  }
}
