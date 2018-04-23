import { NgModule, Input, ElementRef, Renderer2 } from '@angular/core';

import { AvSelectComponent } from './select';
import { AvBase } from '../shared/base';
import { CommonModule } from '@angular/common';
import { AvInputModule } from '../input/input.module';

@NgModule({
  imports: [ CommonModule, AvInputModule ],
  exports: [ AvSelectComponent ],
  declarations: [ AvSelectComponent ],
  providers: [],
})
export class AvSelectModule { }
