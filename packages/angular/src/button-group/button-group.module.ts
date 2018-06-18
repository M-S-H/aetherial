import { NgModule } from '@angular/core';
import { AvButtonGroupComponent } from './button-group';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvButtonGroupItemComponent } from './button-group-item';
import { AvSharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ CommonModule, FormsModule, AvSharedModule ],
  exports: [ AvButtonGroupComponent, AvButtonGroupItemComponent ],
  declarations: [AvButtonGroupComponent, AvButtonGroupItemComponent ],
  providers: []
})
export class AvButtonGroupModule { }
