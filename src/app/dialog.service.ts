import { Observable } from 'rxjs/Observable';
import { AddSignoutDialogComponent } from './add-signout-dialog/add-signout-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MdDialog) { }

    public newSignout(config: MdDialogConfig): Observable<boolean> {

        let dialogRef: MdDialogRef<AddSignoutDialogComponent>;

        dialogRef = this.dialog.open(AddSignoutDialogComponent, config);
        return dialogRef.afterClosed();
    }

    public warnDialog(config: MdDialog): Observable<boolean> {
        let dialogRef: MdDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent, config);
        return dialogRef.afterClosed();
    }

    
}