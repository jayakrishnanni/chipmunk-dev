import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { YourComponent } from './your.component'; // Adjust the import according to your file structure
import { AssetGroupService } from './asset-group.service'; // Adjust the import according to your file structure
import { SuccessDialogBoxComponent } from './success-dialog-box/success-dialog-box.component'; // Adjust the import according to your file structure
import { ErrorDialogBoxComponent } from './error-dialog-box/error-dialog-box.component'; // Adjust the import according to your file structure

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;
  let datePipe: DatePipe;
  let assetGroupService: jasmine.SpyObj<AssetGroupService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const assetGroupServiceSpy = jasmine.createSpyObj('AssetGroupService', ['updateDataAssetGroup']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [YourComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        DatePipe,
        { provide: AssetGroupService, useValue: assetGroupServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    datePipe = TestBed.inject(DatePipe);
    assetGroupService = TestBed.inject(AssetGroupService) as jasmine.SpyObj<AssetGroupService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;

    // Initialize form
    component.editAssetGroup = new FormBuilder().group({
      assetGroupOwner: [''],
      dateRetired: [''],
      assetGroupNotes: ['']
    });

    // Mock form values and additional properties
    component.editAssetGroupUsers = [];
    component.editAssetGroupPII = [];

    fixture.detectChanges();
  });

  it('should submit the form and handle success response', () => {
    const mockResponse = { status: 'Success' };
    assetGroupService.updateDataAssetGroup.and.returnValue(of(mockResponse));

    component.editAssetGroup.setValue({
      assetGroupOwner: 'Owner',
      dateRetired: new Date(),
      assetGroupNotes: 'Some notes'
    });

    spyOn(datePipe, 'transform').and.returnValue('01/01/2022');

    component.submitUpdateAssetGroup();

    expect(assetGroupService.updateDataAssetGroup).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalledWith(SuccessDialogBoxComponent, { data: { message: 'Success' } });
  });

  it('should submit the form and handle error response', () => {
    const mockResponse = { status: 'Error' };
    assetGroupService.updateDataAssetGroup.and.returnValue(of(mockResponse));

    component.editAssetGroup.setValue({
      assetGroupOwner: 'Owner',
      dateRetired: new Date(),
      assetGroupNotes: 'Some notes'
    });

    spyOn(datePipe, 'transform').and.returnValue('01/01/2022');

    component.submitUpdateAssetGroup();

    expect(assetGroupService.updateDataAssetGroup).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalledWith(ErrorDialogBoxComponent, { data: { message: 'Error' } });
  });

  it('should handle service call failure', () => {
    assetGroupService.updateDataAssetGroup.and.returnValue(throwError('Service failure'));

    component.editAssetGroup.setValue({
      assetGroupOwner: 'Owner',
      dateRetired: new Date(),
      assetGroupNotes: 'Some notes'
    });

    spyOn(datePipe, 'transform').and.returnValue('01/01/2022');

    component.submitUpdateAssetGroup();

    expect(assetGroupService.updateDataAssetGroup).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalledWith(ErrorDialogBoxComponent, { data: { message: 'Service failure' } });
  });
});
