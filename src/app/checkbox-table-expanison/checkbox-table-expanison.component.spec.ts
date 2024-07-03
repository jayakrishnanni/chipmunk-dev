import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTableExpanisonComponent } from './checkbox-table-expanison.component';

describe('CheckboxTableExpanisonComponent', () => {
  let component: CheckboxTableExpanisonComponent;
  let fixture: ComponentFixture<CheckboxTableExpanisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxTableExpanisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxTableExpanisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
