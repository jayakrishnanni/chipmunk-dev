import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-date-pciker',
  templateUrl: './date-pciker.component.html',
  styleUrls: ['./date-pciker.component.scss']
})
export class DatePcikerComponent {
    date!: Date;
    formattedDate!: string;
  
    constructor(private datePipe: DatePipe) {}
  
    ngOnInit() {
      // Initialize the date in 'dd/MM/yyyy' format
      const dateString = '09/07/2024';
      this.date = this.parseDate(dateString);
      this.formattedDate = this.datePipe.transform(this.date, 'dd/MM/yyyy');
    }
  
    parseDate(dateString: string): Date {
      const parts = dateString.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // months are zero-based
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
  
    onDateChange(event: any) {
      const date = event.value;
      this.formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    }



  }
  







  import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit {
  form: FormGroup;
  formattedDate: string;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {}

  ngOnInit() {
    // Initialize the form with a date value
    const dateString = '09/07/2024';
    const date = this.parseDate(dateString);

    this.form = this.fb.group({
      date: [date]
    });

    this.formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  parseDate(dateString: string): Date {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // months are zero-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  onDateChange(event: any) {
    const date = event.value;
    this.formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}



// date-picker.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [DatePipe]
})
export class DatePickerComponent implements OnInit {
  @Input() initialDate: string;
  @Output() dateChange = new EventEmitter<string>();

  dateControl: FormControl;
  formattedDate: string;

  constructor(private datePipe: DatePipe) {
    this.dateControl = new FormControl();
  }

  ngOnInit() {
    if (this.initialDate) {
      const date = this.parseDate(this.initialDate);
      this.dateControl.setValue(date);
      this.formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    }

    this.dateControl.valueChanges.subscribe(date => {
      this.formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      this.dateChange.emit(this.formattedDate);
    });
  }

  parseDate(dateString: string): Date {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // months are zero-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  onDateChange(event: any) {
    const date = event.value;
    this.formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    this.dateChange.emit(this.formattedDate);
  }
}


<!-- app.component.html -->
<app-date-picker [initialDate]="initialDate" (dateChange)="onDateChange($event)"></app-date-picker>


// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initialDate = '09/07/2024';

  onDateChange(newDate: string) {
    console.log('Selected Date:', newDate);
  }
}

