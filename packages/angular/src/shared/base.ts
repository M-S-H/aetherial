import { Input, Renderer2, ElementRef, HostBinding } from '@angular/core';
import { ColorPalette, ColorPaletteValues } from './color';

export class AvBase {
  // Color attribute
  private _color: ColorPalette;

  // Input to set color
  @Input()
  get color(): ColorPalette {
    return this._color;
  }

  set color(value: ColorPalette) {
    // Make sure passed in value is of type ColorPalette or set to primary
    const newColor = ColorPaletteValues[value] !== undefined ? value : 'primary';

    // Remove current color class
    if (newColor !== this._color) {
      this._renderer.removeClass(this._element.nativeElement, this._color);
    }

    // Add new color class
    if (newColor) {
      this._renderer.addClass(this._element.nativeElement, newColor);
    }

    // Set color
    this._color = newColor;
  }

  // Input to set disabled
  @HostBinding('class.disabled') @Input() disabled: boolean;

  // Host class binding for disabled
  constructor(public _renderer: Renderer2, public _element: ElementRef) {
    this.color = 'primary';
    this.disabled = false;
  }
}
