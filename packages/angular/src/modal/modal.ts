import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { visitSiblingRenderNodes } from '@angular/core/src/view/util';

@Component({
  selector: 'av-modal',
  templateUrl: 'modal.html',
  host: { 'class': 'av-modal' },
  animations: [
    trigger('screen', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out')
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),

    trigger('dialog', [
      state('in', style({ opacity: 1, 'margin-top': '0px' })),
      transition(':enter', [
        style({ opacity: 0, 'margin-top': '-20px' }),
        animate('200ms ease-in-out')
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0, 'margin-top': '-20px' }))
      ])
    ])
  ]
})
export class AvModalComponent {
  // If the modal is visible
  @Input() @HostBinding('class.visible') visible = false;

  // Includes a screen
  @Input() screen = true;

  // Close event
  @Output() close = new EventEmitter<any>();

  // Clicking on the screen will close the modal
  @Input() screenClose = true;

  @Input() canCloseSelf = true;

  constructor() { }

  closeModal() {
    this.close.emit();
  }
}
