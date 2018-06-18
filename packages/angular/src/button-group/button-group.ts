import { Component, Renderer2, ElementRef, forwardRef } from '@angular/core';
import { AvBase } from '../shared/base';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AvRadioGroupService } from '../radio-buttons/radio-group.service';


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
    AvRadioGroupService
  ]
})

export class AvButtonGroupComponent extends AvBase implements ControlValueAccessor {

  // The select item
  private _selectedValue: string;

  propagateChange = (_: any) => { };

  constructor(_renderer: Renderer2, _element: ElementRef, private buttonGroupService: AvRadioGroupService) {
    super(_renderer, _element);

    this.buttonGroupService.valueSelected$.subscribe(value => {
      this._selectedValue = value;
      this.propagateChange(this._selectedValue);
    });
  }

  writeValue(value: string) {
    this._selectedValue = value;
    this.buttonGroupService.selectValue(value);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    // this.propagateChange = fn;
  }
}
