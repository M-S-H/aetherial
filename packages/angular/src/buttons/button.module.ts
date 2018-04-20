import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AvButtonComponent } from './button';
import { AvRippleDirective } from '../shared/ripple';
import { AvButtonStateDirective } from './button-state';
import { AvSpinnerModule } from '../spinner/spinner.module';

@NgModule({
  imports: [ CommonModule, BrowserAnimationsModule, AvSpinnerModule ],
  exports: [ AvButtonComponent, AvButtonStateDirective ],
  declarations: [ AvButtonComponent, AvRippleDirective, AvButtonStateDirective ],
  providers: [],
})
export class AvButtonModule { }
