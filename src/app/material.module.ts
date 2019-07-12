// Module to manage all the imported material modules

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule
  ]
})

export class MaterialModule {}
