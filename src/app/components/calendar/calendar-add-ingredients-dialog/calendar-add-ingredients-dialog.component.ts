import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe.model';
import { Todo } from 'src/app/interfaces/todo.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { TodoService } from 'src/app/services/todo.service';
import { TodoCreateDialogComponent } from '../../todo/todo-create/todo-create-dialog/todo-create-dialog.component';

@Component({
	selector: 'app-calendar-add-ingredients-dialog',
	templateUrl: './calendar-add-ingredients-dialog.component.html',
	styleUrls: ['./calendar-add-ingredients-dialog.component.scss']
})
export class CalendarAddIngredientsDialogComponent implements OnInit {
	public recipeItem: Observable<Recipe> | any
	public editing: boolean = false

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { date: string, id: string, title: string },
		private recipeService: RecipeService,
		private todoService: TodoService,
		public dialog: MatDialog
	) {

		// Retrieve document from cloud firestore
		this.recipeItem = this.recipeService.get(this.data.id as any).subscribe(res => {
			this.recipeItem = res
			console.log(this.recipeItem.ingredients[0].title);
		})
	}

	ngOnInit(): void {
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
}
