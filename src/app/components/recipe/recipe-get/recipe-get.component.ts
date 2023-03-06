import { Component, ElementRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { Recipe } from 'src/app/interfaces/recipe.model'
import { Todo } from 'src/app/interfaces/todo.model'
import { RecipeService } from 'src/app/services/recipe.service'
import { TodoService } from 'src/app/services/todo.service'
import { TodoCreateDialogComponent } from '../../todo/todo-create/todo-create-dialog/todo-create-dialog.component'
import { RecipeEditConcoctionDialogComponent } from './recipe-edit/recipe-edit-concoction-dialog.component'
import { RecipeEditDescriptionDialogComponent } from './recipe-edit/recipe-edit-description-dialog.component'
import { RecipeEditIngredientsDialogComponent } from './recipe-edit/recipe-edit-ingredients-dialog.component'
import { RecipeEditMetaDialogComponent } from './recipe-edit/recipe-edit-meta-dialog.component'
import { ResizedEvent } from 'src/app/services/resized.directive'

@Component({
	selector: 'app-recipe-get',
	templateUrl: './recipe-get.component.html',
	styleUrls: ['./recipe-get.component.scss']
})

export class RecipeGetComponent {
	@ViewChild('recipeImage') recipeImage!: ElementRef
	private recipeId: Observable<Recipe> | any
	public recipeItem: Observable<Recipe> | any
	public editing: boolean = false
	public tags!: string[]


	constructor(
		private route: ActivatedRoute,
		private recipeService: RecipeService,
		private todoService: TodoService,
		public dialog: MatDialog
	) {
		// Get param from address bar
		this.route.params.subscribe(params => this.recipeId = params['id'])

		// Retrieve document from cloud firestore
		this.recipeItem = this.recipeService.get(this.recipeId).subscribe(res => {
			this.recipeItem = res

			if (this.recipeItem.tags == undefined)
				this.recipeItem.tags = []

			this.tags = [...this.recipeItem.tags]
		})
	}

	onResized(event: ResizedEvent) {
		this.recipeImage.nativeElement.style.height = event.newRect.width + 'px'
	}


	/**
	 * Update recipe
	 */
	public updateRecipe(recipe: Recipe) {
		this.recipeService.update(recipe)
	}

	public showHideEditButton(event: any) {
		this.editing = !this.editing
	}


	/**
	 * Add todo into shopping-list
	 */
	public openTodoDialog(title: string, qty: number, unit: string): void {
		const dialogRef = this.dialog.open(TodoCreateDialogComponent, {
			data: {
				description: '',
				qty: qty,
				title: title,
				unit: unit
			}
		})
		dialogRef.afterClosed().subscribe(res => {
			if (!res)
				console.log('Cancel')

			else if (!res.value.title)
				console.log('No title')

			else {
				this.todoService.create({
					completed: false,
					description: res.value.description,
					id: '',
					qty: res.value.qty,
					title: res.value.title,
					unit: res.value.unit
				} as Todo)
			}
		})
	}


	/**
	 * Open recipe-edit-meta-dialog
	 */
	public openRecipeEditMetaDialog() {
		let tags: string[] = [...this.recipeItem.tags]

		const dialogRef = this.dialog.open(RecipeEditMetaDialogComponent, {
			data: {
				title: this.recipeItem.title,
				image: this.recipeItem.image,
				tags: this.recipeItem.tags,
				cooking: this.recipeItem.cooking,
				portions: this.recipeItem.portions,
			}
		})
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				this.recipeItem.tags = tags
				console.log('Cancel')
			}
			else {
				this.recipeItem.title = res.value.title
				this.recipeItem.image = res.value.image
				this.recipeItem.tags = res.value.tags
				this.recipeItem.cooking = res.value.cooking
				this.recipeItem.portions = res.value.portions
				this.updateRecipe(this.recipeItem as Recipe)
			}
		})
		console.log(this.recipeItem.image)
	}


	/**
	 * Open recipe-edit-description-dialog
	 */
	public openRecipeEditDescriptionDialog() {
		const dialogRef = this.dialog.open(RecipeEditDescriptionDialogComponent, {
			data: {
				description: this.recipeItem.description
			},
			panelClass: 'description-dialog'
		})
		dialogRef.afterClosed().subscribe(res => {
			if (!res)
				console.log('Cancel')

			else if (!res.value.description)
				console.log('No description')

			else {
				this.recipeItem.description = res.value.description
				this.updateRecipe(this.recipeItem)
			}
		})
	}


	/**
	 * Open recipe-edit-ingredients-dialog
	 */
	public openRecipeEditIngredientsDialog() {
		const dialogRef = this.dialog.open(RecipeEditIngredientsDialogComponent, {
			data: {
				ingredients: this.recipeItem.ingredients
			}
		})
		dialogRef.afterClosed().subscribe(res => {
			if (!res)
				console.log('Cancel')

			else if (!res)
				console.log('No ingredients')

			else { // Update recipe item
				this.recipeItem.ingredients = res
				this.updateRecipe(this.recipeItem)
			}
		})
	}


	/**
	 * Open recipe-edit-concoction-dialog
	 */
	public openRecipeEditConcoctionDialog() {
		const dialogRef = this.dialog.open(RecipeEditConcoctionDialogComponent, {
			data: {
				concoction: this.recipeItem.concoction
			},
			panelClass: 'concoction-dialog'
		})
		dialogRef.afterClosed().subscribe(res => {
			if (!res)
				console.log('Cancel')

			else if (!res)
				console.log('No concoction')

			else { // Update recipe item
				this.recipeItem.concoction = res
				this.updateRecipe(this.recipeItem)
			}
		})
	}
}
