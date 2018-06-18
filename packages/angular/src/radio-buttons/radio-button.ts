import { Component, Renderer2, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { AvBase } from '../shared/base';
import { Subscription } from 'rxjs';
import { AvRadioGroupService } from './radio-group.service';

@Component({
  selector: 'av-radio-button',
  templateUrl: 'radio-button.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'av-radio-button',
    '(click)': 'selected = true'
  }
})

export class AvRadioButtonComponent extends AvBase {
  // The radio button's value
  @Input() value: string;

  // Name of the group the radio button belongs to
  @Input() name: string;

  // Subscription to coordinate when apart of a group
  private subscription: Subscription;

  // Whether the radio button is selected
  private _selected: boolean;
  get selected() { return this._selected; }
  set selected(newValue: boolean) {
    if (newValue !== this._selected) {
      // Broadcast change to other radio buttons if apart of a group
      if (this.radioGroupService) {
        this.radioGroupService.selectValue(this.value);
      } else {
        this._selected = newValue;
      }
    }
  }

  constructor(@Optional() private radioGroupService: AvRadioGroupService, renderer: Renderer2, element: ElementRef) {
    super(renderer, element);

    // Set up radio group subscription
    if (radioGroupService) {
      this.subscription = radioGroupService.valueSelected$.subscribe(value => {
        this._selected = value === this.value;
      });
    }
  }
}
