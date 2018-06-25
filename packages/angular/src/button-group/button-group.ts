import { Component, Renderer2, ElementRef, forwardRef, Input } from '@angular/core';
import { AvBase } from '../shared/base';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AvCheckboxGroupService } from '../checkbox/checkbox-group.service';


@Component({
  selector: 'av-button-group',
  template: `<ng-content></ng-content>`,
  host: { 'class': 'av-button-group' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvButtonGroupComponent),
      multi: true
    },
    AvCheckboxGroupService
  ]
})

export class AvButtonGroupComponent extends AvBase implements ControlValueAccessor {

  // The select item
  private _selectedValue: string;

  // Whether the user can select multiple values
  private _multiple = false;
  @Input()
  get multiple() { return this._multiple; }
  set multiple(newValue: boolean) {
    this.buttonGroupService.multiple = newValue;
    this._multiple = newValue;
  }

  propagateChange = (_: any) => { };

  constructor(_renderer: Renderer2, _element: ElementRef, private buttonGroupService: AvCheckboxGroupService) {
    super(_renderer, _element);

    this.buttonGroupService.multiple = this.multiple;

    this.buttonGroupService.selectedValues$.subscribe(value => {
      if (this.multiple) {
        this._selectedValue = value;
      } else {
        this._selectedValue = value[0];
      }
      console.log(this._selectedValue);
      this.propagateChange(this._selectedValue);
    });
  }

  writeValue(value: any) {
    if (this.multiple) {
      this.buttonGroupService.setValues(value);
    } else {
      this.buttonGroupService.setValues([value]);
    }
    this._selectedValue = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    // this.propagateChange = fn;
  }
}
