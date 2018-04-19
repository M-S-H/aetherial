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
    this.input.control.statusChanges.subscribe(x => {
      this.inputInvalid = this.input.invalid();
    });
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

// @Directive({
//   selector: 'input[AvInput]'
// })
// export class AvInputDirective {
//   constructor(@Self() public control: NgControl) {}

//   invalid() {
//     return this.control.invalid;
//   }
// }

// @Component({
//   selector: 'av-input error',
//   template: `<ng-content></ng-content>`,
//   host: {'class': 'form-error' },
//   animations: [
//     trigger('dope', [
//       state('in', style({ opacity: 1, transform: 'translateX(0)' })),
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateX(-5px)' }),
//         animate('150ms ease-in-out')
//       ]),
//       transition(':leave', [
//         animate('150ms ease-in-out', style({ opacity: 0, transform: 'translateX(-5px)' }))
//       ])
//     ])
//   ]
// })
// export class AvFormErrorComponent {
//   @HostBinding('@dope') animateThis = true;
// }

// @Component({
//   selector: 'av-input',
//   templateUrl: 'input.html',
//   host: {'class': 'av-input'}
// })

// export class AvInputComponent implements OnInit, AfterContentInit {
//   @Input() stufff: any;
//   @ContentChild(AvInputDirective) _control: AvInputDirective;

//   constructor() { }

//   ngOnInit() {}

//   ngAfterContentInit() {
//     console.log('stuff ' + this._control);
//     if (this._control) {
//       window['stuff'] = this._control;
//     }
//   }
// }
