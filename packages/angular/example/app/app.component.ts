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

  constructor(private notificationsService: AvNotificationsService, private fb: FormBuilder) {
    this.formStuff = fb.group({
      checkboxgroupValue: [false],
    });
  }
}
