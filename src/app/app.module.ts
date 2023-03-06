// Core
import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from "@angular/platform-browser"
import { AppRoutingModule } from "./app.routing"
import { environment } from "../environments/environment"
import { HttpClientModule } from '@angular/common/http'

// Firebase
import { initializeApp, provideFirebaseApp } from "@angular/fire/app"
import { provideAuth, getAuth } from "@angular/fire/auth"
import { provideFirestore, getFirestore } from "@angular/fire/firestore"
import { provideStorage, getStorage } from "@angular/fire/storage"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

// Design
import { MaterialModule } from './modules/material.module'
import { MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'

// Internationalization
import { registerLocaleData } from '@angular/common'
import localeSe from '@angular/common/locales/sv'

registerLocaleData(localeSe, 'sv')

// Pipes
import { PipeExcerpt } from './pipes/excerpt.pipe'
import { PipeWeekNumber } from './pipes/weeknumber.pipe'
import { PipeDayOfYear } from './pipes/dayofyear.pipe'
import { PipeSort } from 'src/app/pipes/sort.pipe'
import { DropzoneDirective } from './services/dropzone.directive'

// Components
import { AppComponent } from "./app.component"
import { Error404Component } from './components/error404/error404.component'
import { SettingsComponent } from './components/settings/settings.component'
import { HomeComponent } from './components/home/home.component'
import { TodoComponent } from './components/todo/todo.component'
import { TodoCreateComponent } from './components/todo/todo-create/todo-create.component'
import { TodoCreateDialogComponent } from './components/todo/todo-create/todo-create-dialog/todo-create-dialog.component'
import { TodoListComponent } from './components/todo/todo-list/todo-list.component'
import { RecipeComponent } from './components/recipe/recipe.component'
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component'
import { RecipeGetComponent } from './components/recipe/recipe-get/recipe-get.component'
import { RecipeCreateComponent } from './components/recipe/recipe-create/recipe-create.component'
import { RecipeCreateIngredientDialogComponent } from './components/recipe/recipe-create/recipe-create-dialog/recipe-create-ingredient-dialog.component'
import { RecipeCreateConcoctionDialogComponent } from './components/recipe/recipe-create/recipe-create-dialog/recipe-create-concoction-dialog.component'
import { RecipeEditMetaDialogComponent } from './components/recipe/recipe-get/recipe-edit/recipe-edit-meta-dialog.component'
import { RecipeEditDescriptionDialogComponent } from './components/recipe/recipe-get/recipe-edit/recipe-edit-description-dialog.component'
import { RecipeEditIngredientsDialogComponent } from './components/recipe/recipe-get/recipe-edit/recipe-edit-ingredients-dialog.component'
import { RecipeEditConcoctionDialogComponent } from './components/recipe/recipe-get/recipe-edit/recipe-edit-concoction-dialog.component'
import { CalendarComponent } from './components/calendar/calendar.component'
import { CalendarUpdateDialogComponent } from './components/calendar/calendar-update-dialog/calendar-update-dialog.component'
import { CalendarAddIngredientsDialogComponent } from './components/calendar/calendar-add-ingredients-dialog/calendar-add-ingredients-dialog.component'
import { StorageComponent } from './components/storage/storage.component'
import { StorageUploadComponent } from './components/storage/storage-upload/storage-upload.component'
import { StorageListComponent } from './components/storage/storage-list/storage-list.component'
import { ResizedDirective } from './services/resized.directive'

@NgModule({
	declarations: [
		PipeExcerpt,
		PipeWeekNumber,
		PipeDayOfYear,
		PipeSort,
		AppComponent,
		Error404Component,
		HomeComponent,
		TodoComponent,
		TodoCreateComponent,
		TodoCreateDialogComponent,
		TodoListComponent,
		RecipeComponent,
		RecipeListComponent,
		RecipeGetComponent,
		RecipeCreateComponent,
		SettingsComponent,
		RecipeCreateIngredientDialogComponent,
		RecipeCreateConcoctionDialogComponent,
		RecipeEditMetaDialogComponent,
		RecipeEditDescriptionDialogComponent,
		RecipeEditIngredientsDialogComponent,
		RecipeEditConcoctionDialogComponent,
		CalendarComponent,
		CalendarUpdateDialogComponent,
		CalendarAddIngredientsDialogComponent,
		StorageComponent,
		StorageUploadComponent,
		StorageListComponent,
		DropzoneDirective,
		ResizedDirective
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()),
		BrowserAnimationsModule,
		MaterialModule
	],
	providers: [
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				...new MatDialogConfig(),
				hasBackdrop: true,
				autoFocus: false,
				disableClose: false,
				maxWidth: '540px',
				width: '100%',
				maxHeight: '1150px',
				height: '100%',
				/* position: { top: '0' }, */
			} as MatDialogConfig,
		},
		{ provide: LOCALE_ID, useValue: 'sv' }
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
