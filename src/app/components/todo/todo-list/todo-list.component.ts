import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { Todo } from 'src/app/interfaces/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	]
})
export class TodoListComponent implements OnInit {
	columnsToDisplay = ['completed', 'title', 'qty', 'id']
	expandedTodo!: Todo
	dataSource!: Observable<Todo[]> | any;

	constructor(private todoService: TodoService) { }

	ngOnInit(): void {
		this.dataSource = this.todoService.list()
	}

	// Set css-class to todo row if checkbox value is true
	setClasses(todo: Todo) {
		let classes = {
			'todo-completed': todo
		}
		return classes
	}

	// Toggle completed value when checkbox change
	toggle(todo: Todo) {
		todo.completed = !todo.completed
		this.todoService.update(todo)
	}

	// Delete row in todo list
	delete(todo: Todo) {
		console.log(todo)
		this.todoService.delete(todo)
	}

}
