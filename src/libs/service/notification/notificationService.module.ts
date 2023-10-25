import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/libs/component/dialog-confirm/dialog-confirm.component';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(private dialog: MatDialog) { }

    openDialogConfirm(message: string) {
        this.dialog.open(DialogConfirmComponent, {
            data: { message },
        });
    }
}