import { Observable } from 'rxjs/Rx';
import { AddSignoutDialogComponent } from './add-signout-dialog/add-signout-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MdDialog) { }

    public newSignout(config: MdDialogConfig): Observable<boolean> {

        let dialogRef: MdDialogRef<AddSignoutDialogComponent>;

        dialogRef = this.dialog.open(AddSignoutDialogComponent, config);
        return dialogRef.afterClosed();
    };

    
}