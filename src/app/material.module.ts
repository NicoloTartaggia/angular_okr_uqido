// Module to manage all the imported material modules

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ]
})

export class MaterialModule {}
