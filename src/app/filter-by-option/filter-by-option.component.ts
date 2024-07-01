import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-by-option',
  templateUrl: './filter-by-option.component.html',
  styleUrls: ['./filter-by-option.component.scss']
})
export class FilterByOptionComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: [''],
      groupName: [''],
      dateFrom: [''],
      dateTo: [''],
      dropdownInput1: [''],
      dropdownInput2: [''],
      dropdownDateFrom: [''],
      dropdownDateTo: ['']
    }, { validators: this.dateRangeValidator });
  }

  dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const dateFrom = group.get('dateFrom')?.value;
    const dateTo = group.get('dateTo')?.value;

    return dateFrom && dateTo && dateFrom > dateTo ? { 'dateRange': true } : null;
  }

  applyDropdownValues() {
    const dropdownValues = {
      dropdownInput1: this.myForm.get('dropdownInput1')?.value,
      dropdownInput2: this.myForm.get('dropdownInput2')?.value,
      dropdownDateFrom: this.myForm.get('dropdownDateFrom')?.value,
      dropdownDateTo: this.myForm.get('dropdownDateTo')?.value
    };
    console.log('Applied Dropdown Values:', dropdownValues);
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
