import { Component, HostBinding, Directive, Self, ContentChild, AfterViewInit, Optional, Input, OnChanges, DoCheck } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[avInput]',
  host: { 'class': 'av-input' }
})
export class AvInputDirective {
  constructor(@Optional() @Self() public control: NgControl) {}

  invalid() {
    if (this.control) {
      return this.control.invalid && this.control.dirty;
    } else {
      return false;
    }
  }

  valid() {
    if (this.control) {
      return this.control.dirty && this.control.valid;
    } else {
      return true;
    }
  }

  pristine() {
    if (this.control) {
      return this.pristine;
    }
  }
}

@Component({
  selector: 'av-form-field',
  templateUrl: 'form-field.html',
  host: { 'class': 'av-form-field' }
})
export class AvFormFieldComponent implements AfterViewInit {
  // The form-field's actual form control element
  @ContentChild(AvInputDirective) input: AvInputDirective;

  // Error class binding
  @HostBinding('class.invalid') inputInvalid = false;

  ngAfterViewInit() {
    // Watch the passed in input's state
    if (this.input) {
      this.input.control.statusChanges.subscribe(x => {
        this.inputInvalid = this.input.invalid();
      });
    }
  }
}

@Component({
  selector: 'av-form-error',
  template: `<ng-content></ng-content>`,
  host: {'class': 'form-error' },
  animations: [
    trigger('show', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-5px)' }),
        animate('150ms ease-in-out')
      ]),
      transition(':leave', [
        animate('150ms ease-in-out', style({ opacity: 0, transform: 'translateX(-5px)' }))
      ])
    ])
  ]
})
export class AvFormErrorComponent {
  @HostBinding('@show') animateThis = true;
}
