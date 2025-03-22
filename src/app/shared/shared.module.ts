import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextLimitationPipe} from "./pipes/text-limitation.pipe";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    TextLimitationPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TextLimitationPipe
  ]
})
export class SharedModule { }
