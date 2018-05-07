import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvNotificationsOverlayComponent } from './notifications-overlay';
import { AvNotificationsService } from './notifications.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, CommonModule],
  exports: [AvNotificationsOverlayComponent],
  declarations: [AvNotificationsOverlayComponent],
  providers: [],
  entryComponents: [AvNotificationsOverlayComponent]
})
export class AvNotificationsModule {
  static forRoot() {
    return {
      ngModule: AvNotificationsModule,
      providers: [AvNotificationsService]
    };
  }
}
