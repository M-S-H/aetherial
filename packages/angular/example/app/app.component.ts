import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AvNotificationsService } from '../../src/notifications/notifications.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  showModal = false;

  checkboxValue = false;
  checkboxgroupValue = [1, 3];

  formStuff = null;

  buttonState = 'loading';

  isDisabled = true;

  constructor(private notificationsService: AvNotificationsService, private fb: FormBuilder) {
    this.formStuff = fb.group({
      checkboxgroupValue: [false],
    });

    setTimeout(() => {
      this.isDisabled = false;
    }, 10000);

    setTimeout(() => {
      this.buttonState = 'loading';
    }, 5000);

    setTimeout(() => {
      this.buttonState = 'button';
    }, 8000);
  }

  dostuff() {
    console.log('hello');
  }
}
