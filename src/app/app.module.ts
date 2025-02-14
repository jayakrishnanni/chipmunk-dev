import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxTableExpanisonComponent } from './checkbox-table-expanison/checkbox-table-expanison.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatInputComponent } from './mat-input/mat-input.component';
import { ErrorDialogBoxComponent } from './error-dialog-box/error-dialog-box.component';
import { LoaderComponent } from './loader/loader.component';
import { DatePcikerComponent } from './date-pciker/date-pciker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssetComponent } from './asset/asset.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxTableExpanisonComponent,
    BreadcrumbComponent,
    MatInputComponent,
    ErrorDialogBoxComponent,
    LoaderComponent,
    DatePcikerComponent,
    AssetComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }