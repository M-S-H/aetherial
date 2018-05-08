import { Component, Input, ElementRef, HostBinding, Renderer2, QueryList, ContentChildren, OnInit, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AvBase } from '../shared/base';
import { ColorPalette } from '../shared/color';
import { AvButtonStateDirective } from './button-state';

@Component({
  selector: 'button[AvButton]',
  host: { 'class': 'av-button' },
  templateUrl: 'button.html',
  animations: [
    trigger('loadingState', [
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(1.5)' }),
        animate('200ms')
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0, transform: 'scale(1.5)' }))
      ])
    ]),
    trigger('alternateState', [
      state('in', style({ opacity: 0, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 1, transform: 'translateX(10px)' }),
        animate('200ms ease-out')
      ]),
      transition('* => void', [
        animate('200ms ease-out', style({ opacity: 0, transform: 'translateX(10px)' }))
      ])
    ])
  ],
})

export class AvButtonComponent extends AvBase implements AfterViewInit {
  // // Input to disable the button and surpress all click events
  @HostBinding('disabled') @Input() disabled: boolean;

  // The button's state: button, success, error, loading
  private _buttonState = 'button';

  // The button's original color
  private _originalColor: ColorPalette;

  // List of possible states the button can take on.
  @ContentChildren(AvButtonStateDirective) states: QueryList<AvButtonStateDirective>;

  // Button State getter
  @Input()
  get buttonState() {
    return this._buttonState;
  }

  // Button State setter
  set buttonState(newState: string) {
    if (newState === 'button') {
      if (this._originalColor) {
        this.color = this._originalColor;
        this._originalColor = null;
      }
      this._buttonState = newState;
    } else if (newState === 'loading') {
      this._buttonState = newState;
    } else if (['success', 'error'].indexOf(newState) !== -1) {
      if (this.states) {
        const s = this.states.find(x => x.state === newState);
        if (s) {
          if (!this._originalColor) {
            this._originalColor = this.color;
          }
          this.color = s.color as ColorPalette || s.state as ColorPalette;
          this._buttonState = newState;
        }
      } else {
        this._buttonState = newState;
      }
    }

    this.isAlternateState = this.buttonState !== 'button';
  }

  // Class binding for alternate state
  @HostBinding('class.alternate-state') isAlternateState = false;

  ngAfterViewInit() {
    this.buttonState = this._buttonState;
  }

  constructor(_renderer: Renderer2, _element: ElementRef) {
    super(_renderer, _element);
  }

  hostElement() {
    return this._element.nativeElement;
  }
}
