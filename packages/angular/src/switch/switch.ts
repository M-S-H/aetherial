import { Component, Renderer2, ElementRef, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { AvBase } from '../shared/base';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'av-switch',
  templateUrl: 'switch.html',
  host: {
    'class': 'av-switch',
    '(click)': 'state = !state'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvSwitchComponent),
      multi: true
    }
  ]
})

export class AvSwitchComponent extends AvBase implements ControlValueAccessor {

  // The switch's state
  private _state = false;
  @Input()
  get state() { return this._state; }
  set state(newState: boolean) {
    this._state = newState;
    this.propagateChange(this._state);
    this.stateChange.emit(newState);
  }

  @Output() stateChange = new EventEmitter<boolean>();

  constructor(_renderer: Renderer2, _element: ElementRef) {
    super(_renderer, _element);
  }

  propagateChange = (_: any) => { };

  writeValue(value: boolean) {
    this._state = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    // this.propagateChange = fn;
  }
}
