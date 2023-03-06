import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Recipe } from 'src/app/interfaces/recipe.model'
import { RecipeService } from 'src/app/services/recipe.service'

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements AfterViewInit {
	public dataSource: MatTableDataSource<Recipe> | any
	public displayedColumns: string[] = ['id', 'title']
	public searchValue: string = ''

	@ViewChild(MatPaginator) paginator!: MatPaginator
	@ViewChild(MatSort) sort!: MatSort

	constructor(private recipeService: RecipeService) { }

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

}