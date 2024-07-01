import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: [''],
      groupName: [''],
      dateFrom: [''],
      dateTo: [''],
      dropdownInput1: [''],
      dropdownInput2: [''],
      dropdownInput3: [''],
      dropdownInput4: ['']
    });
  }

  applyDropdownValues() {
    // Implement logic to apply dropdown values if needed
    console.log('Dropdown values applied');
  }

  clearAll() {
    this.myForm.reset();
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form Submitted', this.myForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
