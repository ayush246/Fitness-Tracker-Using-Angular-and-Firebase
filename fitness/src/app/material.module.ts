import { NgModule } from '@angular/core';
import {MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule, MatDatepickerModule,
     MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule, 
     MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule, 
     MatTableModule, MatSortModule, MatPaginatorModule, MatSnackBarModule} from '@angular/material'; 
// we have to import each material in this manner
//When adding a new Angular Material component, you have to add the appropriate module import 
//(e.g. for the MatButton you add the MatButtonModule to imports[] in your MaterialModule ).
// dont forget to import material module in the app module


@NgModule({
    //import components from material module
    imports:[
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule
    ], 
    // export all the imported material
    exports:[
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule] 
})
export class MaterialModule{}