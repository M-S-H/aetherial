import { Component, Renderer2, ElementRef, forwardRef, Input, HostListener, Optional, ViewEncapsulation, AfterViewInit } from '@angular/core';
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

export class AvCheckboxComponent extends AvBase implements AfterViewInit {
  // The value of the checkbox
  private _value = null;
  @Input()
  get value() { return this._value; }
  set value(newValue) {
    this._value = newValue;
    this._checked = this.checkboxGroupService.selected.indexOf(this.value) !== -1;
    this.propagateChange(this._checked);
  }

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
    // this._checked = this.checkboxGroupService.selected.indexOf(this.value) !== -1;
    // this.propagateChange(this._checked);
  }

  ngAfterViewInit() {
    console.log('init!!!!!');
    // Setup subscription if in group
    if (this.checkboxGroupService) {
      // const values = null;
      // this._checked = this.checkboxGroupService.selected.indexOf(this.value) !== -1;
      this.checkboxGroupService.selectedValues$.subscribe(values => {
        this._checked = values.indexOf(this.value) !== -1;
        this.propagateChange(this._checked);
      });
    }
  }

  propagateChange = (_: any) => { };

  writeValue(value: boolean) {
    this.checked = value;
  }

  // shouldCheck(values) {
  //   this._checked = values.indexOf(this.value) !== -1;
  //   this.propagateChange(this._checked);
  // }

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
