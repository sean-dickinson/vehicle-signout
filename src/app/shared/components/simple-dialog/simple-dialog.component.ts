import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css']
})
export class SimpleDialogComponent {
  message: string;
  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.message = data;
   }

}
