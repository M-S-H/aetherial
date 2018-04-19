import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AvInputDirective, AvFormFieldComponent, AvFormErrorComponent } from './input';

@NgModule({
  imports: [ BrowserModule ],
  exports: [ AvInputDirective, AvFormFieldComponent, AvFormErrorComponent ],
  declarations: [ AvInputDirective, AvFormFieldComponent, AvFormErrorComponent ],
  providers: [],
})
export class AvInputModule { }
