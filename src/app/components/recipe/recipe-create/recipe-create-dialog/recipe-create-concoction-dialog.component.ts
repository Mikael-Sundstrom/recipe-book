import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
	selector: 'app-recipe-create-dialog',
	template: `
	<h2 mat-dialog-title>Lägg till instruktion</h2>
	<mat-dialog-content>
		<form [formGroup]="recipeForm">
			<mat-form-field>
				<mat-label>Instruktion</mat-label>
				<textarea matInput formControlName="description" placeholder="Skriv instruktion..."></textarea>
			</mat-form-field>
		</form>
	</mat-dialog-content>
	<div class="spacer"></div>
	<mat-dialog-actions align="end">
		<button mat-button [mat-dialog-close]="false">Avbryt</button>
		<button mat-raised-button [mat-dialog-close]="recipeForm" type="button" color="accent">
			Skapa
		</button>
	</mat-dialog-actions>
	`,
	styles: [`
	mat-form-field {
		width: 100%;

		textarea {
			min-height: 128px;
		}
	}
	`]
})

export class RecipeCreateConcoctionDialogComponent implements OnInit {

	recipeForm: FormGroup = this._formBuilder.group({
		description: this.data.description
	})

	constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { description: string }) { }

	ngOnInit(): void {

	}
}