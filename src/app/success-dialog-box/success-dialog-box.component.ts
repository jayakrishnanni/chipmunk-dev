import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog-box',
  template: `
  <h1 mat-dialog-title>Success</h1>
  <div mat-dialog-content>
    <p>{{ data.message }}</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>OK</button>
  </div>
`
})
export class SuccessDialogBoxComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}



  // openSuccessDialog(): void {
  //   const dialogRef = this.dialog.open(SuccessDialogComponent, {
  //     data: { message: 'Your operation was successful!' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('Success dialog was closed');
  //   });
  // }
