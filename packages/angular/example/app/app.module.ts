import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AvButtonModule } from '../../src';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AvButtonModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
