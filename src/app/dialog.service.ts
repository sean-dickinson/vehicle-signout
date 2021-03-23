import { Observable } from 'rxjs';
import { AddSignoutDialogComponent } from './signout-view/components/add-signout-dialog/add-signout-dialog.component';
import { ConfirmDialogComponent } from './manage-signout/confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) { }

    public newSignout(config: MatDialogConfig): Observable<boolean> {

        let dialogRef: MatDialogRef<AddSignoutDialogComponent>;

        dialogRef = this.dialog.open(AddSignoutDialogComponent, config);
        return dialogRef.afterClosed();
    }

    public warnDialog(config: MatDialogConfig): Observable<boolean> {
        let dialogRef: MatDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent, config);
        return dialogRef.afterClosed();
    }

    
}