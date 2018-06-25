import { Component, Input, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AvCheckboxGroupService } from '../checkbox/checkbox-group.service';

@Component({
  selector: 'av-button-group-item',
  templateUrl: 'button-group-item.html',
  host: {
    'class': 'av-button-group-item',
    '[class.active]': '_selected',
    '(click)': 'toggle()'
  }
})
export class AvButtonGroupItemComponent {
  // The item's value
  @Input() value: string;

  // Subscription to the group the item belongs to
  private subscription: Subscription;

  // Whether the button is selected
  private _selected = false;

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
