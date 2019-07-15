import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  imports:
    [
      CommonModule,
      MaterialModule
    ],
  declarations: [ ],
  exports:
    [
      CommonModule,
      FormsModule,
      MaterialModule,
      ReactiveFormsModule
    ]
})
export class SharedModule { }
