import { Component, forwardRef, AfterViewInit, ContentChildren, QueryList, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AvCheckboxGroupService } from './checkbox-group.service';
import { AvCheckboxComponent } from './checkbox';
import { ColorPalette } from '../shared/color';

@Component({
  selector: 'av-checkbox-group',
  template: `
    <ng-content></ng-content>
  `,
  host: { 'class': 'av-checkbox-group' },
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvCheckboxGroupComponent),
      multi: true
    },
    AvCheckboxGroupService
  ]
})

export class AvCheckboxGroupComponent {
  // Child checkboxes
  @ContentChildren(forwardRef(() => AvCheckboxComponent)) _checkboxes: QueryList<AvCheckboxComponent>;

  // The group's color
  private _color: ColorPalette;
  @Input()
  get color() { return this._color; }
  set color(newColor: ColorPalette) {
    if (newColor !== this._color) {
      this._color = newColor;

      if (this._checkboxes) {
        this.propagateColor();
      }
    }
  }

  propagateChange = (_: any) => { };

  constructor(private checkboxGroupService: AvCheckboxGroupService) { }

  writeValue(values: any[]) {
    this.checkboxGroupService.setValues(values);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateChange = fn;
  }

  // Propagates color to child checkboxes
  propagateColor() {
    this._checkboxes.forEach(checkbox => {
      checkbox.color = this._color;
    });
  }
}
