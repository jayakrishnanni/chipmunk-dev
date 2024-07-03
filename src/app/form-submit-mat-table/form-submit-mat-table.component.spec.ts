import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmitMatTableComponent } from './form-submit-mat-table.component';

describe('FormSubmitMatTableComponent', () => {
  let component: FormSubmitMatTableComponent;
  let fixture: ComponentFixture<FormSubmitMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubmitMatTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubmitMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
