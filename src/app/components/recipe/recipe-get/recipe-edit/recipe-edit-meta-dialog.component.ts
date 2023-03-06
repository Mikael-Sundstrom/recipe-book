import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, Inject, ElementRef, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent } from '@angular/material/chips'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable } from 'rxjs/internal/Observable'
import { map, startWith } from 'rxjs/operators'

@Component({
	selector: 'app-recipe-edit-meta',
	template: `
		<h2 mat-dialog-title>Redigera information</h2>
		<mat-dialog-content class="edit-meta-dialog">
			<form [formGroup]="recipeMetaForm">

				<!-- Title -->
				<mat-form-field>
					<mat-label>Rubrik</mat-label>
					<input type="text" matInput formControlName="title" autocomplete="off">
				</mat-form-field>

				<!-- Image -->
				<app-storage-upload (uploadURL)="uploadImage($event)"></app-storage-upload><br />

				<!-- Categories -->
				<mat-form-field>
					<mat-label>Kategori / taggar</mat-label>
					<mat-chip-grid #chipGrid aria-label="Välj kategori">
						<mat-chip-row *ngFor="let tag of this.data.tags" (removed)="removeCategory(tag)">
							{{tag}}
							<button matChipRemove>
								<mat-icon>cancel</mat-icon>
							</button>
						</mat-chip-row>
						<input placeholder="Ny kategori..." #categoryInput formControlName="tags" [formControl]="categoryCtrl" [matAutocomplete]="auto" [matChipInputFor]="chipGrid" [matChipInputSeparatorKeyCodes]="separatorKeysCodes" (matChipInputTokenEnd)="addCategory($event)" autocomplete="off">
					</mat-chip-grid>
					<mat-autocomplete #auto="matAutocomplete" (optionSelected)="selectedCategory($event)">
						<mat-option *ngFor="let category of filteredCategories | async" [value]="category">
							{{category}}
						</mat-option>
					</mat-autocomplete>
				</mat-form-field>

				<!-- Cooking -->
				<mat-form-field>
					<mat-label>Tid att tillaga (min)</mat-label>
					<input type="number" matInput formControlName="cooking" autocomplete="off" min="0">
				</mat-form-field>

				<!-- Portions -->
				<mat-form-field>
					<mat-label>Portioner</mat-label>
					<input type="number" matInput formControlName="portions" autocomplete="off" min="0">
				</mat-form-field>
			</form>

		</mat-dialog-content>
		<div class="spacer"></div>
		<mat-dialog-actions align="end">
			<button mat-button [mat-dialog-close]="false">Avbryt</button>
			<button mat-raised-button [mat-dialog-close]="recipeMetaForm" type="button" color="accent">
				Spara
			</button>
		</mat-dialog-actions>
	`,
	styles: [`
		mat-form-field {
			width: 100%;
		}
  `]
})

export class RecipeEditMetaDialogComponent {

	// Category tags
	public separatorKeysCodes: number[] = [ENTER, COMMA]
	public categoryCtrl = new FormControl('')
	public filteredCategories!: Observable<string[]>
	public allCategories: string[] = ['LCHF', 'Pasta', 'Kött', 'Fisk', 'Kyckling', 'Fågel', 'Bröd', 'Mellanmål', 'Middag', 'Snacks', 'Godis', 'Fika', 'Frukost']
	@ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>

	// Form values
	recipeMetaForm: FormGroup = this._formBuilder.group({
		title: this.data.title,
		image: this.data.image,
		tags: [this.data.tags],
		cooking: this.data.cooking,
		portions: this.data.portions
	})

	constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, image: string, tags: Array<string>, cooking: number, portions: number, fixer: Array<string> }, private _formBuilder: FormBuilder) {
		this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
			startWith(null),
			map((tag: string | null) => (tag ? this._filterCategory(tag) : this.allCategories.slice()))
		)
	}

	uploadImage(url: string) {
		this.recipeMetaForm.patchValue({ image: url })
	}

	/**
	 *  Add & remove category
	 */
	public addCategory(event: MatChipInputEvent): void {
		const value = (event.value || '').trim()

		// Add our category
		if (value)
			this.data.tags.push(value)

		// Clear the input value
		event.chipInput!.clear()

		this.categoryCtrl.setValue(null)
	}

	public removeCategory(category: string): void {
		const index = this.data.tags.indexOf(category)

		if (index >= 0)
			this.data.tags.splice(index, 1)
	}

	public selectedCategory(event: MatAutocompleteSelectedEvent): void {
		this.data.tags.push(event.option.viewValue)
		this.categoryInput.nativeElement.value = ''
		this.categoryCtrl.setValue(null)
	}

	private _filterCategory(value: string): string[] {
		const filterValue = value.toLowerCase()

		return this.allCategories.filter(category => category.toLowerCase().includes(filterValue))
	}

}
