import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetComponent } from './asset.component';

describe('AssetComponent', () => {
  let component: AssetComponent;
  let fixture: ComponentFixture<AssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { YourComponent } from './your.component'; // Adjust the import according to your file structure

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YourComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Initialize the FormGroup
    component.editAssetGroup = new FormBuilder().group({
      // form controls initialization
    });

    // Initialize Subjects
    component.clearAllClickEventforPII = new Subject<void>();
    component.clearAllClickEventforUsers = new Subject<void>();

    fixture.detectChanges();
  });

  it('should reset the form and emit events when clearAllEditAssetDataGroup is called', () => {
    spyOn(component.editAssetGroup, 'reset');
    spyOn(component.clearAllClickEventforPII, 'next');
    spyOn(component.clearAllClickEventforUsers, 'next');

    component.clearAllEditAssetDataGroup();

    expect(component.editAssetGroup.reset).toHaveBeenCalled();
    expect(component.clearAllClickEventforPII.next).toHaveBeenCalled();
    expect(component.clearAllClickEventforUsers.next).toHaveBeenCalled();
  });
});

