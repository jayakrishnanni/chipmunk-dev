// app.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dateForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    }, { validator: this.dateRangeValidator });
  }

  dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const fromDate = group.get('fromDate').value;
    const toDate = group.get('toDate').value;
    return fromDate && toDate && new Date(fromDate) > new Date(toDate) ? { dateRangeInvalid: true } : null;
  }

  onSubmit(): void {
    if (this.dateForm.valid) {
      // Handle the form submission
      console.log('Form submitted:', this.dateForm.value);
    }
  }
}



<!-- app.component.html -->
<form [formGroup]="dateForm" (ngSubmit)="onSubmit()">
  <mat-form-field appearance="fill">
    <mat-label>From Date</mat-label>
    <input matInput [matDatepicker]="fromPicker" formControlName="fromDate">
    <mat-datepicker-toggle matSuffix [for]="fromPicker"></mat-datepicker-toggle>
    <mat-datepicker #fromPicker></mat-datepicker>
  </mat-form-field>
  
  <mat-form-field appearance="fill">
    <mat-label>To Date</mat-label>
    <input matInput [matDatepicker]="toPicker" formControlName="toDate">
    <mat-datepicker-toggle matSuffix [for]="toPicker"></mat-datepicker-toggle>
    <mat-datepicker #toPicker></mat-datepicker>
    <mat-error *ngIf="dateForm.errors?.dateRangeInvalid && dateForm.get('toDate').touched">
      To Date cannot be earlier than From Date
    </mat-error>
  </mat-form-field>
  
  <button mat-raised-button color="primary" type="submit" [disabled]="dateForm.invalid">Search</button>
</form>

