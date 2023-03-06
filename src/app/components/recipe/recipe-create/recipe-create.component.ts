import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { FormControl } from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent } from '@angular/material/chips'
import { Observable } from 'rxjs/internal/Observable'
import { map, startWith } from 'rxjs/operators'
import { Recipe } from 'src/app/interfaces/recipe.model'
import { RecipeService } from 'src/app/services/recipe.service'
import { MatDialog } from '@angular/material/dialog'
import { RecipeCreateIngredientDialogComponent } from './recipe-create-dialog/recipe-create-ingredient-dialog.component'
import { RecipeCreateConcoctionDialogComponent } from './recipe-create-dialog/recipe-create-concoction-dialog.component'
import { Router } from '@angular/router'

@Component({
	selector: 'app-recipe-create',
	templateUrl: './recipe-create.component.html',
	styleUrls: ['./recipe-create.component.scss']
})

export class RecipeCreateComponent {
	public recipeItem!: Observable<Recipe>
	public recipeId!: string

	private created: Date = new Date(Date.now())
	private updated: Date = new Date(Date.now())
	public image: string = 'assets/images/placeholder-cooking.svg'
	public title: string = ''
	public cooking!: number
	public portions!: number
	public description: string = ''

	// Category tags
	public separatorKeysCodes: number[] = [ENTER, COMMA]
	public categoryCtrl = new FormControl('')
	public filteredCategories!: Observable<string[]>
	public categories: string[] = []
	public allCategories: string[] = ['LCHF', 'Pasta', 'Kött', 'Fisk', 'Kyckling', 'Fågel', 'Bröd', 'Mellanmål', 'Middag', 'Snacks', 'Godis', 'Fika', 'Frukost']
	@ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>

	// Ingredient
	@ViewChild('ingredientTable') ingredientTable: any
	public ingredients: Array<any> = []

	// Concoction
	@ViewChild('concoctionTable') concoctionTable: any
	public concoction: Array<string> = []


	constructor(private recipeService: RecipeService, public dialog: MatDialog, private router: Router) {
		this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
			startWith(null),
			map((tag: string | null) => (tag ? this._filterCategory(tag) : this.allCategories.slice()))
		)
	}

	uploadImage(url: string) {
		this.image = url
	}


	/**
	 * Adding todo item to firebase with help of TodoService
	 */
	public create() {
		if (!this.title || !this.portions || !this.ingredients || !this.concoction) return console.log('bla')
		this.recipeService.create({
			concoction: this.concoction,
			cooking: this.cooking ? this.cooking : 0,
			created: this.created,
			description: this.description,
			image: this.image,
			id: '',
			ingredients: this.ingredients,
			portions: this.portions ? this.portions : 0,
			tags: this.categories,
			title: this.title,
			updated: this.updated
		}, (recipeId: string) => {
			this.router.navigate(['/recipe', recipeId])
		})

	}


	/**
	 *  Add & remove category
	 */
	public addCategory(event: MatChipInputEvent): void {
		const value = (event.value || '').trim()

		if (value)
			this.categories.push(value)

		event.chipInput!.clear()

		this.categoryCtrl.setValue(null)
	}

	public removeCategory(fruit: string): void {
		const index = this.categories.indexOf(fruit)

		if (index >= 0)
			this.categories.splice(index, 1)
	}

	public selectedCategory(event: MatAutocompleteSelectedEvent): void {
		this.categories.push(event.option.viewValue)
		this.categoryInput.nativeElement.value = ''
		this.categoryCtrl.setValue(null)
	}

	private _filterCategory(value: string): string[] {
		const filterValue = value.toLowerCase()

		return this.allCategories.filter(category => category.toLowerCase().includes(filterValue))
	}


	/**
	 * Add ingredient
	 */
	public openIngredientDialog() {
		const dialogRef = this.dialog.open(RecipeCreateIngredientDialogComponent, {
			data: {
				title: '',
				qty: '',
				unit: ''
			}
		})
		dialogRef.afterClosed().subscribe(
			data => {
				if (!data)
					return console.log('Cancel')

				else if (!data.value.title || !data.value.qty || !data.value.unit)
					return console.log('Empty string')

				else {
					this.ingredients.push(data.value)
					return this.ingredientTable.renderRows()
				}
			}
		)
	}


	/**
	 * Delete ingredient
	 */
	public deleteIngredient(ingredient: number) {
		this.ingredients.splice(ingredient, 1)
		return this.ingredientTable.renderRows()
	}


	/**
	 * Drag & drop ingredient
	 */
	public dropIngredient(event: CdkDragDrop<object[]>) {
		const prevIndex = this.ingredients.findIndex((d) => d === event.item.data)
		moveItemInArray(this.ingredients, prevIndex, event.currentIndex)
		return this.ingredientTable.renderRows()
	}


	/**
	 * Add concoction
	 */
	public openConcoctionDialog() {
		const dialogRef = this.dialog.open(RecipeCreateConcoctionDialogComponent, {
			data: {
				description: ''
			}
		})
		dialogRef.afterClosed().subscribe(
			data => {
				if (!data)
					return console.log('Cancel')

				else if (!data.value.description)
					return console.log('Empty string')

				else {
					this.concoction.push(data.value.description)
					return this.concoctionTable.renderRows()
				}
			}
		)
	}


	/**
	 * Delete concoction
	 */
	public deleteConcoction(concoction: number) {
		this.concoction.splice(concoction, 1)
		return this.concoctionTable.renderRows()
	}


	/**
	 * Drag & drop concoction
	 */
	public dropConcoction(event: CdkDragDrop<string[]>) {
		const prevIndex = this.concoction.findIndex((d) => d === event.item.data)
		moveItemInArray(this.concoction, prevIndex, event.currentIndex)
		return this.concoctionTable.renderRows()
	}
}
