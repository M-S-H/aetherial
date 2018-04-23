import { NgModule } from '@angular/core';
import { AvRadioButtonComponent } from './radio-button';
import { CommonModule } from '@angular/common';
import { AvRadioGroupComponent } from './radio-group';

@NgModule({
  imports: [ CommonModule ],
  exports: [ AvRadioButtonComponent, AvRadioGroupComponent ],
  declarations: [ AvRadioButtonComponent, AvRadioGroupComponent ],
  providers: [],
})
export class AvRadioButtonModule { }
