import { Component, Renderer2, ElementRef, forwardRef, Input, HostListener, Optional, ViewEncapsulation } from '@angular/core';
import { AvBase } from '../shared/base';
import { NG_VALUE_ACCESSOR, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { AvCheckboxGroupService } from './checkbox-group.service';

@Component({
  selector: 'av-checkbox',
  templateUrl: 'checkbox.html',
  host: { 'class': 'av-checkbox' },
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvCheckboxComponent),
      multi: true
    }
  ]
})

export class AvCheckboxComponent extends AvBase {
  // The value of the checkbox
  @Input() value: string;

  // Whether the checkbox is checked or not
  private _checked = false;
  @Input()
  get checked() { return this._checked; }
  set checked(newValue: boolean) {
    if (this.checkboxGroupService) {
      if (newValue) {
        this.checkboxGroupService.addValue(this.value);
      } else {
        this.checkboxGroupService.removeValue(this.value);
      }
    } else {
      this._checked = newValue;
      this.propagateChange(this._checked);
    }
  }

  constructor(
    @Optional() private checkboxGroupService: AvCheckboxGroupService,
    _renderer: Renderer2,
    _element: ElementRef
  ) {
    super(_renderer, _element);

    // Setup subscription if in group
    if (checkboxGroupService) {
      checkboxGroupService.selectedValues$.subscribe(values => {
        this._checked = values.indexOf(this.value) !== -1;
        this.propagateChange(this._checked);
      });
    }
  }

  propagateChange = (_: any) => { };

  writeValue(value: boolean) {
    this.checked = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    // this.propagateChange = fn;
  }

  // Listener to toggle checkbox
  @HostListener('click')
  toggleCheckbox() {
    this.checked = !this.checked;
  }
}
