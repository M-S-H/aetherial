import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AvCheckboxGroupService } from '../checkbox/checkbox-group.service';

@Component({
  selector: 'av-button-group-item',
  templateUrl: 'button-group-item.html',
  host: {
    'class': 'av-button-group-item',
    '[class.active]': 'selected',
    '(click)': 'toggle()'
  }
})
export class AvButtonGroupItemComponent {
  // The item's value
  private _value: string;
  @Input()
  get value() { return this._value; }
  set value(newValue: string) {
    this._value = newValue;
    this._selected = this.buttonGroupService.selected.indexOf(this.value) !== -1;
  }

  // Subscription to the group the item belongs to
  private subscription: Subscription;

  // Whether the button is selected
  private _selected = false;
  get selected() { return this._selected; }

  get element() { return this._element; }

  constructor(private buttonGroupService: AvCheckboxGroupService, private _element: ElementRef) {
    // Setup subscription
    this.subscription = buttonGroupService.selectedValues$.subscribe(values => {
      this._selected = values.indexOf(this.value) !== -1;
    });
  }

  toggle() {
    if (this._selected && this.buttonGroupService.multiple) {
      this.buttonGroupService.removeValue(this.value);
    } else {
      this.buttonGroupService.addValue(this.value);
    }
  }
}
