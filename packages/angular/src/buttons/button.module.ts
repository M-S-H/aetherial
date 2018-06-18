import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AvButtonComponent } from './button';
import { AvButtonStateDirective } from './button-state';
import { AvSpinnerModule } from '../spinner/spinner.module';
import { AvSharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ CommonModule, BrowserAnimationsModule, AvSharedModule, AvSpinnerModule ],
  exports: [ AvButtonComponent, AvButtonStateDirective ],
  declarations: [ AvButtonComponent, AvButtonStateDirective ],
  providers: [],
})
export class AvButtonModule { }
