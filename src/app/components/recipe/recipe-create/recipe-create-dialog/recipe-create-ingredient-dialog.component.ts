import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs/internal/Observable'
import { map, startWith } from 'rxjs/operators'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
	selector: 'app-recipe-create-dialog',
	template: `
	<h2 mat-dialog-title>Lägg till vara</h2>
	<mat-dialog-content>
		<form [formGroup]="recipeForm">
			<mat-form-field>
				<input matInput cdkFocusInitial type="text" placeholder="Produkt" formControlName="title" [matAutocomplete]="groceryGroup" autocomplete="off">
				<mat-autocomplete #groceryGroup="matAutocomplete">
					<mat-option *ngFor="let grocery of filteredGroceries | async" [value]="grocery">
						<div>
							<span>{{grocery}}</span>
						</div>
					</mat-option>
				</mat-autocomplete>
			</mat-form-field>
			<mat-form-field class="create-ingredient-qty">
				<mat-label>Antal</mat-label>
				<input type="number" matInput formControlName="qty" autocomplete="off">
			</mat-form-field>
			<mat-form-field class="create-ingredient-unit">
				<input formControlName="unit" type="text" placeholder="Enhet" matInput [matAutocomplete]="unitsGroup" autocomplete="off">
				<mat-autocomplete #unitsGroup="matAutocomplete">
					<mat-option *ngFor="let unit of filteredUnits | async" [value]="unit">
						{{ unit }}
					</mat-option>
				</mat-autocomplete>
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

		&.create-ingredient-qty {
			width: 70%;
			float: left;
		}

		&.create-ingredient-unit {
			width: 30%;
		}
	}

	mat-option {
		box-shadow: 0px 1px 0px #e2e2e2;

		div {
			display: flex;

			img {
				align-self: center;
				height: 40px;
				margin-right: 16px;
			}
		}
	}

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	`]
})

export class RecipeCreateIngredientDialogComponent implements OnInit {
	filteredGroceries!: Observable<string[]>
	filteredUnits!: Observable<string[]>

	groceries: string[] = ['Ananas', 'Appelsin', 'Avokado', 'Banan', 'Björnbär', 'Blåbär', 'Blodappelsin', 'Blomkol', 'Broccoli', 'Cantaloupe', 'Chilli', 'Chilipeppar', 'Citron', 'Clementin', 'Dill', 'Enbär', 'Fikon', 'Fränkol', 'Galiamelon', 'Granatäpple', 'Grapefrukt', 'Gurka', 'Hallon', 'Hasselnöt', 'Havrekorn', 'Hjortron', 'Honungsmelon', 'Ingefära', 'Jalapeño', 'Jordgubbe', 'Jordnöt', 'Kiwi', 'Klementin', 'Kokosnöt', 'Korn', 'Krusbär', 'Kryddpeppar', 'Körsbär', 'Lime', 'Lingon', 'Lök', 'Majskorn', 'Mandarin', 'Mandel', 'Mango', 'Nektarin', 'Nypon', 'Oliv', 'Paprika', 'Peppar', 'Persika', 'Plommon', 'Potatis', 'Pumpa', 'Purjolök', 'Päron', 'Röda vinbär', 'Ruccola', 'Rättika', 'Rönnbär', 'Selleri', 'Schalottenlök', 'Smultron', 'Sockerärt', 'Solrosfrö', 'Sparris', 'Squash', 'Svarta vinbär', 'Sötpotatis', 'Tomat', 'Tranbär', 'Tryffel', 'Valnöt', 'Vattenmelon', 'Vinbär', 'Vindruva', 'Vitlök', 'Äpple', 'Ärtor', 'Mjölk', 'Olivolja', 'Smör', 'Jäst', 'Socker', 'Salt', 'Lax', 'Anka', 'Kyckling', 'Nötkött', 'Oxfilé', 'Bacon',]
	units: string[] = ['st', 'liter', 'dl', 'ml', 'msk', 'tsk', 'krm', 'kkp', 'kg', 'hg', 'g', 'paket', 'burk']

	recipeForm: FormGroup = this._formBuilder.group({
		qty: this.data.qty,
		title: this.data.title,
		unit: this.data.unit
	})

	constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { title: string, qty: number, unit: string }) { }

	ngOnInit(): void {
		this.filteredGroceries = this.recipeForm.get('title')!.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		)
		this.filteredUnits = this.recipeForm.get('unit')!.valueChanges.pipe(
			startWith(''),
			map(value => this._filters(value))
		)
	}

	private _filters(value: string): string[] {
		return this.units.filter(option => option.toLowerCase().includes(value.toLowerCase()))
	}

	private _filter(value: string): string[] {
		return this.groceries.filter(option => option.toLowerCase().includes(value.toLowerCase()))
	}
}