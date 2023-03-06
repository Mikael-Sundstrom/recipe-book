import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs/internal/Observable'
import { map, startWith } from 'rxjs/operators'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
	selector: 'app-todo-create-dialog',
	templateUrl: './todo-create-dialog.component.html',
	styleUrls: ['./todo-create-dialog.component.scss']
})

export class TodoCreateDialogComponent implements OnInit {
	filteredGroceries!: Observable<string[]>
	filteredUnits!: Observable<string[]>

	groceries: string[] = ['Ananas', 'Appelsin', 'Avokado', 'Banan', 'Björnbär', 'Blåbär', 'Blodappelsin', 'Blomkol', 'Broccoli', 'Cantaloupe', 'Chilli', 'Chilipeppar', 'Citron', 'Clementin', 'Dill', 'Enbär', 'Fikon', 'Fränkol', 'Galiamelon', 'Granatäpple', 'Grapefrukt', 'Gurka', 'Hallon', 'Hasselnöt', 'Havrekorn', 'Hjortron', 'Honungsmelon', 'Ingefära', 'Jalapeño', 'Jordgubbe', 'Jordnöt', 'Kiwi', 'Klementin', 'Kokosnöt', 'Korn', 'Krusbär', 'Kryddpeppar', 'Körsbär', 'Lime', 'Lingon', 'Lök', 'Majskorn', 'Mandarin', 'Mandel', 'Mango', 'Nektarin', 'Nypon', 'Oliv', 'Paprika', 'Peppar', 'Persika', 'Plommon', 'Potatis', 'Pumpa', 'Purjolök', 'Päron', 'Röda vinbär', 'Ruccola', 'Rättika', 'Rönnbär', 'Selleri', 'Schalottenlök', 'Smultron', 'Sockerärt', 'Solrosfrö', 'Sparris', 'Squash', 'Svarta vinbär', 'Sötpotatis', 'Tomat', 'Tranbär', 'Tryffel', 'Valnöt', 'Vattenmelon', 'Vinbär', 'Vindruva', 'Vitlök', 'Äpple', 'Ärtor', 'Mjölk', 'Olivolja', 'Smör', 'Jäst', 'Socker', 'Salt', 'Lax', 'Anka', 'Kyckling', 'Nötkött', 'Oxfilé', 'Bacon',]
	units: string[] = ['st', 'l', 'kg', 'g', 'paket', 'burk']

	todoForm: FormGroup = this._formBuilder.group({
		description: this.data.description,
		qty: this.data.qty,
		title: this.data.title,
		unit: this.data.unit
	})

	constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { description: string, qty: number, title: string, unit: string }) { }

	ngOnInit(): void {
		this.filteredGroceries = this.todoForm.get('title')!.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		)
		this.filteredUnits = this.todoForm.get('unit')!.valueChanges.pipe(
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
