import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CalendarComponent } from './components/calendar/calendar.component'
import { Error404Component } from './components/error404/error404.component'
import { HomeComponent } from './components/home/home.component'
import { RecipeCreateComponent } from './components/recipe/recipe-create/recipe-create.component'
import { RecipeGetComponent } from './components/recipe/recipe-get/recipe-get.component'
import { RecipeComponent } from './components/recipe/recipe.component'
import { TodoComponent } from './components/todo/todo.component'
import { StorageComponent } from './components/storage/storage.component'

const routes: Routes = [
	{
		path: '',
		redirectTo: 'calendar',
		pathMatch: 'full'
	},
	{
		path: 'home',
		children: [{
			path: '**',
			children: [],
			component: Error404Component
		}],
		component: HomeComponent
	},
	{
		path: 'recipes',
		children: [{
			path: '**',
			children: [],
			component: Error404Component
		}],
		component: RecipeComponent
	},
	{
		path: 'calendar',
		children: [{
			path: '**',
			children: [],
			component: Error404Component
		}],
		component: CalendarComponent
	},
	{
		path: 'storage',
		children: [{
			path: '**',
			children: [],
			component: Error404Component
		}],
		component: StorageComponent
	},
	{
		path: 'shopping-list',
		children: [{
			path: '**',
			children: [],
			component: Error404Component
		}],
		component: TodoComponent
	},
	{
		path: 'new-recipe',
		children: [{
			path: '**',
			children: [],
			component: Error404Component
		}],
		component: RecipeCreateComponent
	},
	{
		path: 'recipe/:id',
		children: [{
			path: '**',
			children: [],
			component: Error404Component
		}],
		component: RecipeGetComponent
	},
	{
		path: '**',
		children: [],
		component: Error404Component
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
