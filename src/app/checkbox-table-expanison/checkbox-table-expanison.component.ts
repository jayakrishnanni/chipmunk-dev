import { Component } from '@angular/core';
interface TableElement {
  name: string;
  groupName: string;
  dateFrom: Date;
  dateTo: Date;
}

const ELEMENT_DATA: TableElement[] = [
  {name: 'John', groupName: 'Group 1', dateFrom: new Date('2023-01-01'), dateTo: new Date('2023-12-31')},
  {name: 'Jane', groupName: 'Group 2', dateFrom: new Date('2023-02-01'), dateTo: new Date('2023-11-30')},
  // Add more elements as needed
];

@Component({
  selector: 'app-checkbox-table-expanison',
  templateUrl: './checkbox-table-expanison.component.html',
  styleUrls: ['./checkbox-table-expanison.component.scss']
})
export class CheckboxTableExpanisonComponent {
  
 
    displayedColumns: string[] = ['select', 'name', 'groupName', 'dateFrom', 'dateTo'];
    dataSource = new MatTableDataSource<TableElement>(ELEMENT_DATA);
    selection = new SelectionModel<TableElement>(true, []);
    expandedElement: TableElement | null = null;
  
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    isIndeterminate() {
      const numSelected = this.selection.selected.length;
      return numSelected > 0 && numSelected < this.dataSource.data.length;
    }
  
    masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
  
    toggleSelection(row: TableElement) {
      this.selection.toggle(row);
    }
  
    toggleRow(element: TableElement) {
      this.expandedElement = this.expandedElement === element ? null : element;
    }

  
}
