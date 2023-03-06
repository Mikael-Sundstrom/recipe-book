import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs/internal/Observable'
import { map, startWith } from 'rxjs/operators'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Recipe } from 'src/app/interfaces/recipe.model'
import { RecipeService } from 'src/app/services/recipe.service'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
	selector: 'app-update-dialog',
	templateUrl: './calendar-update-dialog.component.html',
	styleUrls: ['./calendar-update-dialog.component.scss']
})
export class CalendarUpdateDialogComponent implements AfterViewInit {
	public dataSource: MatTableDataSource<Recipe> | any
	public displayedColumns: string[] = ['id', 'title']
	public searchValue: string = ''

	@ViewChild(MatPaginator) paginator!: MatPaginator
	@ViewChild(MatSort) sort!: MatSort

	calendarForm: FormGroup = this._formBuilder.group({
		date: this.data.date,
		id: this.data.id,
		title: this.data.title
	})


	constructor(private recipeService: RecipeService, private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { date: string, id: string, title: string }) {
		console.log(this.data)
	}



	public ngAfterViewInit() {
		this.recipeService.list().subscribe(res => {
			this.dataSource = new MatTableDataSource(res)

			this.dataSource.paginator = this.paginator
			this.dataSource.sort = this.sort
		})
	}


	public applyFilter(event: any) {
		switch (event.type) {
			case 'click':
				this.searchValue = ''
				this.dataSource.filter = this.searchValue
				break
			case 'keyup':
				if (event.code == 'Escape' || event.keyCode == 27) {
					this.searchValue = ''
					this.dataSource.filter = this.searchValue
				}
				else {
					this.dataSource.filter = event.target.value.trim().toLowerCase()

					if (this.dataSource.paginator)
						return this.dataSource.paginator.firstPage()
				}
				break
		}
		return
	}


	public console(foo: any) {
		this.calendarForm.controls['id'].setValue(foo.id)
		this.calendarForm.controls['title'].setValue(foo.title)
	}
}
