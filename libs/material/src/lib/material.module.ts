import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';

const modules = [
	MatFormFieldModule,
	MatInputModule,
	MatTableModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatProgressSpinnerModule,
	MatAutocompleteModule,
];
@NgModule({
	imports: [CommonModule, ...modules],
	exports: [...modules],
})
export class MaterialModule {}
