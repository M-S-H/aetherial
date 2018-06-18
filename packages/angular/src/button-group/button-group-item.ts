import { Component, Input, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AvRadioGroupService } from '../radio-buttons/radio-group.service';

@Component({
  selector: 'av-button-group-item',
  templateUrl: 'button-group-item.html',
  host: {
    'class': 'av-button-group-item',
    '[class.active]': '_selected',
    '(click)': 'select()'
  }
})
export class AvButtonGroupItemComponent {
  // The item's value
  @Input() value: string;

  // Subscription to the group the item belongs to
  private subscription: Subscription;

  // Whether the button is selected
  private _selected = false;

  constructor(private buttonGroupService: AvRadioGroupService, private _element: ElementRef) {
    // Setup subscription
    this.subscription = buttonGroupService.valueSelected$.subscribe(value => {
      this._selected = this.value === value;
    });
  }

  select() {
    this.buttonGroupService.selectValue(this.value);
  }
}
