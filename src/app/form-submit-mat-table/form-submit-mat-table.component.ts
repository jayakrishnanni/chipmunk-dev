import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent {
  inputForm: FormGroup;
  tableForm: FormGroup;
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
  displayedColumns: string[] = ['select', 'name'];

  constructor(private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      input1: [''],
      input2: ['']
    });

    this.tableForm = this.fb.group({
      selectedItems: [this.selection.selected]
    });
  }

  clearInputForm() {
    this.inputForm.reset();
  }

  onSubmitInputForm() {
    console.log(this.inputForm.value);
  }

  clearTableForm() {
    this.selection.clear();
  }

  onSubmitTableForm() {
    console.log(this.selection.selected);
  }

  clearAllForms() {
    this.clearInputForm();
    this.clearTableForm();
  }

  submitAllForms() {
    const combinedData = {
      inputForm: this.inputForm.value,
      selectedItems: this.selection.selected
    };
    console.log(combinedData);
    // Call your API here
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  toggleSelection(row: Element) {
    this.selection.toggle(row);
  }
}

export interface Element {
  name: string;
}

const ELEMENT_DATA: Element[] = [
  {name: 'Hydrogen'},
  {name: 'Helium'},
  {name: 'Lithium'},
  {name: 'Beryllium'},
  {name: 'Boron'},
  {name: 'Carbon'},
  {name: 'Nitrogen'},
  {name: 'Oxygen'},
  {name: 'Fluorine'},
  {name: 'Neon'}
];
