
import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { DataAssetGroupService } from 'src/app/service/data-asset-group.service';
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { BreadcrumbService } from 'src/app/service/breadcrumb.service';
  import { MatTableDataSource } from '@angular/material/table';
  import { Subject } from 'rxjs';
  import { MatExpansionModule } from '@angular/material/expansion';
  import { AssetGroupAllowedPII, AssetGroupUsers } from 'src/app/model/asset.model';
  import { DatePipe } from '@angular/common';
  import { LoaderService } from 'src/app/service/loader.service';
  import { ErrorDialogBoxComponent } from '../../shared/dialog-box/error-dialog-box/error-dialog-box.component';
  import { SuccessDialogBoxComponent } from '../../shared/dialog-box/success-dialog-box/success-dialog-box.component';
   
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
    onSelected(onSelected: any, arg1: string) {
      throw new Error('Method not implemented.');
    }
   
    @ViewChild('assetgroupexpansionPanel') assetgroupexpansionPanel: MatExpansionModule | undefined;
    @ViewChild('assetgroupexpansionforUsers') assetgroupexpansionforUsers: MatExpansionModule | undefined;
    @ViewChild('assetgroupexpansionforPII') assetgroupexpansionforPII: MatExpansionModule | undefined;
    panelOpenState: boolean = false;
    assetGroupData!:FormGroup;
    editAssetGroup!:FormGroup<any>;
    editAssetGroupUsers!: any;
    editAssetGroupPII!: any;
    clearAllClickEventforPII: Subject<void> = new Subject<void>();
    clearAllClickEventforUsers: Subject<void> = new Subject<void>();
   
   
   
    assetGroupUsers!: { assetGroupUserId: string; assetGroupContact: string; stsAccount: string; dateActivated: string; dateRetired: string; notes: string; }[];
    assetGroupAllowedPII!: { availablePiId: number; dateActivated: string; dateRetired: string; notes: string; piiTableName: string; piiColumnName: string; piiDescription: string; }[];
    assetGroupDetails!: {
      assetGroupId: number; assetGroupOwner: string; dateActivated: string; dateRetired: string; notes: string;
      assetGroupAllowedPII: { availablePiId: number; dateActivated: string; dateRetired: string; notes: string; piiTableName: string; piiColumnName: string; piiDescription: string; }[];
      assetGroupUsers: { assetGroupUserId: string; assetGroupContact: string; stsAccount: string; dateActivated: string; dateRetired: string; notes: string; }[];
    };
    columnsToDisplayforUsers!: string[];
    columnsToDisplayWithExpandforUsers!: string[];
    columnsToDisplayForPII: any;
    columnsToDisplayWithExpandForPII!: any[];
   
   
   
    assetType!: string;
    dataSourceforUsers: any;
    assetGroupTypeUser!: string;
    dataSourceForPII: any;
    assetGroupTypePII!: string;
   
    columnHeaderForUsers: { [key: string]: string } = {
      assetGroupUserId: 'Asset Group User Id',
      assetGroupContact: 'Asset Group Contact',
      stsAccount: 'STS Account',
      dateActivated: 'Date ACtivated',
      dateRetired: 'Date Retired'
    }
   
   
    columnHeaderForPII: { [key: string]: string } = {
      availablePiId: 'Available PII Id',
      piiTableName: 'PII Table Name',
      piiColumnName: 'PII Column Name',
      dateActivated: 'Date ACtivated'
    }
    updateResponse!: string;
    selectedItem: any;
   
   
    constructor(public dialog: MatDialog,
      private fb: FormBuilder,
      private assetGroupService: DataAssetGroupService,
      private breadcrumbService: BreadcrumbService,
      private datePipe: DatePipe,
      private loaderService: LoaderService
    ) { }
   
    ngOnInit(): void {
      this.breadcrumbService.setBreadCrumb([
        { label: 'Asset Group Management' },
        { label: 'Data Asset Group', url: '/asset-group' },
        { label: '1456' }
      ])
   
      this.assetType = 'edit';
   
      this.viewDataAssetGroup();
    }
   
    formattedDate!: string | any;
    date!: Date;
    parseDate(dateString: string): Date {
      const parts = dateString.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // months are zero-based
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
   
    viewDataAssetGroup() {
      const data = {
        "assetGroupId": 14653
      }
   
      this.assetGroupService.viewAssetGroupData(data).subscribe((response) => {
        if (response) {
          this.assetGroupUsers = responseData.assetGroupUsers;
          this.assetGroupAllowedPII = responseData.assetGroupAllowedPII;
          this.assetGroupDetails = responseData;
          this.editAssetGroup = this.fb.group({
            assetGroupOwner: [responseData.assetGroupOwner],
            dateRetired: [responseData.dateRetired],
            assetGroupNotes: [responseData.notes]
          })
   
          //passing to child c3p-checkbox-data-group component for asset users
          this.columnsToDisplayforUsers = ['select', 'assetGroupUserId', 'assetGroupContact', 'stsAccount', 'dateActivated', 'dateRetired'];
          this.columnsToDisplayWithExpandforUsers = [...this.columnsToDisplayforUsers, 'expand'];
          this.dataSourceforUsers = new MatTableDataSource<AssetGroupUsers>(this.assetGroupUsers);
          this.assetGroupTypeUser = 'assetUser';
   
          //passing to child c3p-checkbox-data-group component for available PII
          this.columnsToDisplayForPII = ['select', 'availablePiId', 'piiTableName', 'piiColumnName', 'dateActivated'];
          this.columnsToDisplayWithExpandForPII = [...this.columnsToDisplayForPII, 'expand'];
          this.dataSourceForPII = new MatTableDataSource<AssetGroupAllowedPII>(this.assetGroupAllowedPII);
          this.assetGroupTypePII = 'allowedPII';
   
        } else {
          this.assetGroupUsers = responseData.assetGroupUsers;
          this.assetGroupAllowedPII = responseData.assetGroupAllowedPII;
          this.assetGroupDetails = responseData;
          this.editAssetGroup = this.fb.group({
            assetGroupOwner: [responseData.assetGroupOwner],
            dateRetired: [responseData.dateRetired],
            assetGroupNotes: [responseData.notes]
          })
   
          //passing to child c3p-checkbox-data-group component for asset users
          this.columnsToDisplayforUsers = ['select', 'assetGroupUserId', 'assetGroupContact', 'stsAccount', 'dateActivated', 'dateRetired'];
          this.columnsToDisplayWithExpandforUsers = [...this.columnsToDisplayforUsers, 'expand'];
          this.dataSourceforUsers = new MatTableDataSource<AssetGroupUsers>(this.assetGroupUsers);
          this.assetGroupTypeUser = 'assetUser';
   
          //passing to child c3p-checkbox-data-group component for available PII
          this.columnsToDisplayForPII = ['select', 'availablePiId', 'piiTableName', 'piiColumnName', 'dateActivated'];
          this.columnsToDisplayWithExpandForPII = [...this.columnsToDisplayForPII, 'expand'];
          this.dataSourceForPII = new MatTableDataSource<AssetGroupAllowedPII>(this.assetGroupAllowedPII);
          this.assetGroupTypePII = 'allowedPII';
        }
      }, (error) => {
   
        this.assetGroupUsers = responseData.assetGroupUsers;
        this.assetGroupAllowedPII = responseData.assetGroupAllowedPII;
        this.assetGroupDetails = responseData;
   
        const dateString = responseData.dateRetired;
        this.date = this.parseDate(dateString);
   
        this.editAssetGroup = this.fb.group({
          assetGroupOwner: [responseData.assetGroupOwner],
          dateRetired: [this.date],
          assetGroupNotes: [responseData.notes]
        })
   
   
        //passing to child c3p-checkbox-data-group component for asset users
        this.columnsToDisplayforUsers = ['select', 'assetGroupUserId', 'assetGroupContact', 'stsAccount', 'dateActivated', 'dateRetired'];
        this.columnsToDisplayWithExpandforUsers = [...this.columnsToDisplayforUsers, 'expand'];
        this.dataSourceforUsers = new MatTableDataSource<AssetGroupUsers>(this.assetGroupUsers);
        this.assetGroupTypeUser = 'assetUser';
   
        //passing to child c3p-checkbox-data-group component for available PII
        this.columnsToDisplayForPII = ['select', 'availablePiId', 'piiTableName', 'piiColumnName', 'dateActivated'];
        this.columnsToDisplayWithExpandForPII = [...this.columnsToDisplayForPII, 'expand'];
        this.dataSourceForPII = new MatTableDataSource<AssetGroupAllowedPII>(this.assetGroupAllowedPII);
        this.assetGroupTypePII = 'allowedPII';
   
      });
    }
   
    //Edit asset group users
    updateForUsers(e: any) {
      console.log("jkkkeditAssetGroupUsers", e)
      this.editAssetGroupUsers = e;
    }
   
    //Edit asset group PII
    updateForPII(e: any) {
      console.log("jkkkeditAssetGroupPII", e)
      this.editAssetGroupPII = e;
    }
   
    //clear all asset group details
    clearEditAssetGroup() {
      this.editAssetGroup.reset();
    }
   
    //Update asset group data
    onSubmitEditAssetGroup() {
    }
   
   
    //clear all asset group user details
    clearEditAssetGroupUsers() {
      this.clearAllClickEventforUsers.next();
    }
   
    //clear all asset group data and call the api to update the value
    clearEditAssetAllowedPII() {
      this.clearAllClickEventforPII.next();
    }
   
    clearAllEditAssetDataGroup() {
      this.editAssetGroup.reset();
      this.clearAllClickEventforPII.next();
      this.clearAllClickEventforUsers.next();
    }
   
   
    //Add all asset group data and call the api to update the value
    submitUpdateAssetGroup() {
      const editAssetGroup = {
        assetGroupOwner: this.editAssetGroup.value.assetGroupOwner,
        dateRetired: this.datePipe.transform(this.editAssetGroup.value.dateRetired, 'dd/MM/yyyy'),
        notes: this.editAssetGroup.value.assetGroupNotes,
        assetGroupId: ''
      }
      const data = {
        ...this.editAssetGroup,
        assetGroupUsers: this.editAssetGroupUsers,
        assetGroupAllowedPii: this.editAssetGroupPII
      };
   
      console.log("jkkk data", data)
      this.assetGroupService.updateDataAssetGroup(data).subscribe((response: any) => {
        if (response.status === 'Success') {
          this.updateResponse = response.status;
          this.dialog.open(SuccessDialogBoxComponent, {
                data: { message: response.status }
          })
        } else{
          this.dialog.open(ErrorDialogBoxComponent, {
            data: { message: response.status }
          })
        }
      }, (error: any) => {
        this.dialog.open(ErrorDialogBoxComponent, {
          data: { message: error }
        })
      });
    }
  }
   
   
  const responseData =
  {
    "assetGroupId": 14765,
    "assetGroupOwner": "abcd",
    "dateActivated": "20/11/2023",
    "dateRetired": "20/11/2023",
    "notes": "ajdalkjdlkskldfekjdk",
    "assetGroupAllowedPII": [
      {
        "availablePiId": 1234,
        "dateActivated": "20-02-2024",
        "dateRetired": "20-02-2024",
        "notes": "Test Notes",
        "piiTableName": "Test PII Table Name",
        "piiColumnName": "Test PII Coulmn Name",
        "piiDescription": "Test PII Description"
      },
      {
        "availablePiId": 1234,
        "dateActivated": "20-02-2024",
        "dateRetired": "20-02-2024",
        "notes": "Test Notes",
        "piiTableName": "Test PII Table Name",
        "piiColumnName": "Test PII Coulmn Name",
        "piiDescription": "Test PII Description"
      }
    ],
    "assetGroupUsers": [
      {
        "assetGroupUserId": "1",
        "assetGroupContact": "1",
        "stsAccount": "1",
        "dateActivated": "1",
        "dateRetired": "1",
        "notes": "1",
      },
      {
        "assetGroupUserId": "2",
        "assetGroupContact": "1",
        "stsAccount": "1",
        "dateActivated": "1",
        "dateRetired": "1",
        "notes": "1",
      }
    ]
  }
   
   
  const payLoad = {
    "assetGroupOwner": "abcd",
    "dateRetired": "20/11/2023",
    "notes": "ajdalkjdlkskldfekjdk",
    "assetGroupId": "",
    "assetGroupUsers": [
        {
            "assetGroupUserId": "1",
            "assetGroupContact": "1",
            "stsAccount": "1",
            "dateActivated": "1",
            "dateRetired": "1",
            "notes": "1"
        },
        {
            "assetGroupUserId": "2",
            "assetGroupContact": "1",
            "stsAccount": "1",
            "dateActivated": "1",
            "dateRetired": "1",
            "notes": "1"
        }
    ],
    "assetGroupAllowedPii": [
        {
            "availablePiId": 1234,
            "dateActivated": "20-02-2024",
            "dateRetired": "20-02-2024",
            "notes": "Test Notes",
            "piiTableName": "Test PII Table Name",
            "piiColumnName": "Test PII Coulmn Name",
            "piiDescription": "Test PII Description"
        },
        {
            "availablePiId": 1234,
            "dateActivated": "20-02-2024",
            "dateRetired": "20-02-2024",
            "notes": "Test Notes",
            "piiTableName": "Test PII Table Name",
            "piiColumnName": "Test PII Coulmn Name",
            "piiDescription": "Test PII Description"
        }
    ]
  }
  
  

