// Module to manage all the imported material modules

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTableModule
  ]
})

export class MaterialModule {}
