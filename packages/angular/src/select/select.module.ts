import { NgModule, Input, ElementRef, Renderer2 } from '@angular/core';

import { AvSelectComponent } from './select';
import { SvSelectOverlayComponent } from './select-overlay';
import { AvBase } from '../shared/base';
import { CommonModule } from '@angular/common';
import { AvInputModule } from '../input/input.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, AvInputModule ],
  exports: [ AvSelectComponent, SvSelectOverlayComponent ],
  declarations: [ AvSelectComponent, SvSelectOverlayComponent ],
  providers: [],
  entryComponents: [ SvSelectOverlayComponent ]
})
export class AvSelectModule { }
