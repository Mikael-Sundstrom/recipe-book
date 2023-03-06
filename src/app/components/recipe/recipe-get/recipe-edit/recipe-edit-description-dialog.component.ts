import { Component, Inject, ElementRef, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable } from 'rxjs/internal/Observable'
import { map, startWith } from 'rxjs/operators'

@Component({
	selector: 'app-recipe-edit-description',
	template: `
		<h2 mat-dialog-title>Redigera information</h2>
		<mat-dialog-content class="edit-description-dialog">
			<form [formGroup]="recipeDescriptionForm">
				<mat-form-field>
					<mat-label>Beskrivning</mat-label>
					<textarea matInput formControlName="description" placeholder="Skriv något för att tillägga..." autofocus="off"></textarea>
				</mat-form-field>
			</form>
		</mat-dialog-content>
		<div class="spacer"></div>
		<mat-dialog-actions align="end">
			<button mat-button [mat-dialog-close]="false">Avbryt</button>
			<button mat-raised-button [mat-dialog-close]="recipeDescriptionForm" type="button" color="accent">
				Spara
			</button>
		</mat-dialog-actions>
	`,
	styles: [`
	.description-dialog {
		background: red;
	}
		.edit-description-dialog {
			display: flex;
			flex-direction: column;
			height: 100%;

			mat-form-field {
				display: flex;
				width: 100%;

				textarea.mat-mdc-input-element {
					min-height: 256px;
				}
			}
		}
  `]
})

export class RecipeEditDescriptionDialogComponent {

	// Form values
	recipeDescriptionForm: FormGroup = this._formBuilder.group({
		description: this.data.description
	})

	constructor(@Inject(MAT_DIALOG_DATA) public data: { description: string }, private _formBuilder: FormBuilder) {

	}



}
