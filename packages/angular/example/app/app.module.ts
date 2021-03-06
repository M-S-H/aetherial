import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AvButtonModule, AvSpinnerModule, AvNotificationsModule, AvCheckboxModule, AvButtonGroupModule, AvSwitchModule } from '../../src';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvModalModule } from '../../src/modal/modal.module';
import { AvInputModule } from '../../src/input/input.module';
import { AvSelectModule } from '../../src/select/select.module';
import { AvRadioButtonModule } from '../../src/radio-buttons/radio-buttons.module';
import { AvAvatarModule } from '../../src/avatar/avatar.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AvButtonModule,
    AvSpinnerModule,
    AvModalModule,
    AvInputModule,
    AvSelectModule,
    AvRadioButtonModule,
    BrowserAnimationsModule,
    AvAvatarModule,
    AvNotificationsModule.forRoot(),
    AvCheckboxModule,
    AvButtonGroupModule,
    AvSwitchModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
