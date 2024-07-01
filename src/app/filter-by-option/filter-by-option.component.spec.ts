import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByOptionComponent } from './filter-by-option.component';

describe('FilterByOptionComponent', () => {
  let component: FilterByOptionComponent;
  let fixture: ComponentFixture<FilterByOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
