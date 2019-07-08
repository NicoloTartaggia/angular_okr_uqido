// Module to manage all the imported material modules

import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    MatListModule,
    MatExpansionModule
  ],
  exports: [
    MatListModule,
    MatExpansionModule
  ]
})

export class MaterialModule {}
