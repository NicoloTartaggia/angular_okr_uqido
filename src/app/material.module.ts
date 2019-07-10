// Module to manage all the imported material modules

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports: [
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ]
})

export class MaterialModule {}
