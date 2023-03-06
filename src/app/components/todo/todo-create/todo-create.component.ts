import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { Todo } from 'src/app/interfaces/todo.model'
import { TodoService } from 'src/app/services/todo.service'
import { TodoCreateDialogComponent } from './todo-create-dialog/todo-create-dialog.component'

@Component({
	selector: 'app-todo-create',
	templateUrl: './todo-create.component.html',
	styleUrls: ['./todo-create.component.scss']
})

export class TodoCreateComponent implements OnInit {

	constructor(public dialog: MatDialog, private todoService: TodoService) { }

	ngOnInit(): void {
	}

	openDialog() {
		const dialogConfig = new MatDialogConfig()

		dialogConfig.disableClose = false
		dialogConfig.autoFocus = true
		dialogConfig.width = '85%'
		dialogConfig.maxWidth = '420px'
		dialogConfig.position = { top: '10%' }
		dialogConfig.data = {
			description: '',
			qty: '',
			title: '',
			unit: 'st'
		}

		const dialogRef = this.dialog.open(TodoCreateDialogComponent, dialogConfig)

		dialogRef.afterClosed().subscribe(
			data => {
				// If the respons data is not set, then return with no action
				if (!data)
					return console.log('Cancel')
				// After submit button: it will check if "todoForm->title" has a value in the create-todo-dialog.component.html
				if (!data.value.title) {
					console.log('Empty string')
				} else {
					this.create(data.value)
				}
			}
		)
	}

	// Adding todo item to firebase with help of TodoService
	create(todo: Todo) {
		this.todoService.create({
			completed: false,
			description: todo.description,
			id: '',
			qty: todo.qty,
			title: todo.title,
			unit: todo.unit
		})
	}

}
