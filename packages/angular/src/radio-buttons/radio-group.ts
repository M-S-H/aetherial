import { Component, forwardRef, AfterViewInit, Input, ContentChildren, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { AvRadioGroupService } from './radio-group.service';
import { AvRadioButtonComponent } from './radio-button';
import { ColorPalette } from '../shared/color';

@Component({
  selector: 'av-radio-group',
  template: `
    <ng-content select="av-radio-button"></ng-content>
  `,
  host: { 'class': 'av-radio-group' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvRadioGroupComponent),
      multi: true
    },
    AvRadioGroupService
  ]
})

export class AvRadioGroupComponent implements AfterViewInit, ControlValueAccessor {
  // The selected value
  @Input() selected: string;

  // Child radio buttons
  @ContentChildren(forwardRef(() => AvRadioButtonComponent)) private _radioButtons: QueryList<AvRadioButtonComponent>;

  // Radio group color which is propagated to the group's radio buttons
  private _color: ColorPalette;
  @Input()
  get color() { return this._color; }
  set color(newColor: ColorPalette) {
    if (newColor !== this._color) {
      this._color = newColor;

      if (this._radioButtons) {
        this.propagateColor();
      }
    }
  }

  // The name of the radio group
  private _name: string;
  set name(newName: string) {
    if (newName !== this._name) {
      this._name = newName;

      if (this._radioButtons) {
        this.propagateName();
      }
    }
  }

  propagateChange = (_: any) => { };

  constructor(private radioGroupService: AvRadioGroupService) {
    // Subscribe to the radioGroupService to detect changes on selected value
    radioGroupService.valueSelected$.subscribe(value => {
      if (value !== null || value !== undefined) {
        if (this.selected !== value) {
          this.selected = value;
          this.propagateChange(this.selected);
        }
      }
    });
  }

  writeValue(value: string) {
    this.selected = value;
    this.radioGroupService.selectValue(value);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    // this.propagateChange = fn;
  }

  ngAfterViewInit() {
    // Initialize the selected value to input
    setTimeout(() => {
      this.radioGroupService.selectValue(this.selected);
      this.propagateColor();
      this.propagateName();
    }, 0);
  }

  // Propagates given color to each child radio-button
  propagateName() {
    this._radioButtons.forEach(radio => {
      radio.name = this._name;
    });
  }

  // Propagates given name to each child radio-button
  propagateColor() {
    this._radioButtons.forEach(radio => {
      radio.color = this._color;
    });
  }
}
