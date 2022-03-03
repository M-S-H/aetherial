import { NgModule } from '@angular/core';
import { AvBase } from './base';
import { AvRippleDirective } from './ripple';

@NgModule({
  imports: [],
  exports: [ AvRippleDirective ],
  declarations: [ AvRippleDirective, AvBase ],
  providers: [],
})
export class AvSharedModule { }
