import { NgModule } from '@angular/core';

import { AvCheckboxComponent } from './checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvCheckboxGroupComponent } from './checkbox-group';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  exports: [ AvCheckboxComponent, AvCheckboxGroupComponent ],
  declarations: [ AvCheckboxComponent, AvCheckboxGroupComponent ],
  providers: [],
})
export class AvCheckboxModule { }
