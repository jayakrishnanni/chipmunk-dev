import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePcikerComponent } from './date-pciker.component';

describe('DatePcikerComponent', () => {
  let component: DatePcikerComponent;
  let fixture: ComponentFixture<DatePcikerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePcikerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePcikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
