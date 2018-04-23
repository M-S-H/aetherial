import { Component, Input, Renderer2, ElementRef, HostBinding } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AvBase } from '../shared/base';

@Component({
  selector: 'av-select',
  templateUrl: 'select.html',
  host: { 'class': 'av-select' },
  animations: [
    trigger('slideDown', [
      state('in', style({ opacity: 1, 'transform': 'scaleY(1)' })),
      transition(':enter', [
        style({ opacity: 0, 'transform': 'scaleY(0)' }),
        animate('150ms ease-in-out')
      ]),
      transition(':leave', [
        animate('150ms ease-in-out', style({ opacity: 0, 'transform': 'scaleY(0)' }))
      ])
    ]),

    trigger('open', [
      state('open', style({ 'box-shadow': '0 1px 10px rgba(0, 0, 0, 0.25)' })),
      transition('closed => open', [
        style({ opacity: 0, 'box-shadow': '0 1px 0px rgba(0, 0, 0, 0.25)' }),
        animate('1500ms ease-in-out')
      ]),
      transition('open => closed', [
        animate('1500ms ease-in-out', style({ opacity: 0, 'box-shadow': '0 1px 0px rgba(0, 0, 0, 0.25)' }))
      ])
    ])
  ]
})
export class AvSelectComponent extends AvBase {
  // Options to be displayed
  @Input() items: Array<any> = [];

  private _open = false;
  @HostBinding('@open') get open() { return this._open; }
  set open(newValue: boolean) {
    this._open = newValue;
  }

  private _selected: string;
  get selected() { return this._selected; }
  set selected(newValue: string) {
    this._selected = newValue;
  }

  constructor(renderer: Renderer2, element: ElementRef) {
    super(renderer, element);
  }
}
