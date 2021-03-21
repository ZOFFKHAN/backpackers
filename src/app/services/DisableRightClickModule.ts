import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableRightClickDirective } from './disable-right-click.directive';

@NgModule({
  declarations: [
    DisableRightClickDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DisableRightClickDirective
  ]
})
export class DisableRightClickModule {
}