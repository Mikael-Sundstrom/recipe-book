import { Component, OnDestroy } from '@angular/core'
import { DocumentData, Timestamp } from '@angular/fire/firestore'
import { CalendarService } from 'src/app/services/calendar.service'
import { Calendar } from 'src/app/interfaces/calendar.model'
import { CalendarUpdateDialogComponent } from './calendar-update-dialog/calendar-update-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { CalendarAddIngredientsDialogComponent } from './calendar-add-ingredients-dialog/calendar-add-ingredients-dialog.component'
import { Subscription } from 'rxjs/internal/Subscription'

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnDestroy {
	public today: Date
	public displayedColumns: string[] = ['week', 'title', 'date', 'shopping-list']
	public dataSource: object[] = []
	private newCalendar: DocumentData = []
	private subscription: Subscription

	constructor(private calendarService: CalendarService, public dialog: MatDialog) {
		this.today = new Date(Date.now())

		this.subscription = this.calendarService.get('iAO75REEKmjHqipG1ece').subscribe(res => {

			const index = res['planner'].findIndex((x: { date: string }) => x.date === this.getIsoDate(this.today))
			switch (index) {
				case 2:
					break

				case 3:
					break

				case 4:
					res['planner'].splice(0, 1)
					res['planner'] = this.updateCalendar(res['planner'], 13)
					break

				case 5:
					res['planner'].splice(0, 2)
					res['planner'] = this.updateCalendar(res['planner'], 12)
					break

				case 6:
					res['planner'].splice(0, 3)
					res['planner'] = this.updateCalendar(res['planner'], 11)
					break

				case 7:
					res['planner'].splice(0, 4)
					res['planner'] = this.updateCalendar(res['planner'], 10)
					break

				case 8:
					res['planner'].splice(0, 5)
					res['planner'] = this.updateCalendar(res['planner'], 9)
					break

				case 9:
					res['planner'].splice(0, 6)
					res['planner'] = this.updateCalendar(res['planner'], 8)
					break

				case 10:
					res['planner'].splice(0, 7)
					res['planner'] = this.updateCalendar(res['planner'], 7)
					break

				case 11:
					res['planner'].splice(0, 8)
					res['planner'] = this.updateCalendar(res['planner'], 6)
					break

				case 12:
					res['planner'].splice(0, 9)
					res['planner'] = this.updateCalendar(res['planner'], 5)
					break

				case 13:
					res['planner'].splice(0, 10)
					res['planner'] = this.updateCalendar(res['planner'], 4)
					break

				default:
					res['planner'] = this.updateCalendar()
					break
			}
			this.dataSource = res['planner']
			this.newCalendar = res
		})
		// Update calendar to firestore, TODO: Call after getCalendar response
		setTimeout(() => {
			this.calendarService.update(
				this.newCalendar as Calendar
			)
			console.info('Sent an updated calendar to firebase.')
		}, 1000)
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}

	/**
	 * Take old calendar and then create a new one
	 * @param object[]
	 * @param number
	 * @returns object[]
	 */
	private updateCalendar(calendar: any = false, numberOfObjects: number = 0) {
		const plannerPlaceholder = [
			{ id: '', title: '', date: this.getIsoDate(this.today, -3) },
			{ id: '', title: '', date: this.getIsoDate(this.today, -2) },
			{ id: '', title: '', date: this.getIsoDate(this.today, -1) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 0) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 1) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 2) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 3) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 4) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 5) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 6) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 7) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 8) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 9) },
			{ id: '', title: '', date: this.getIsoDate(this.today, 10) }
		].slice(-14 + numberOfObjects)

		if (!calendar) return plannerPlaceholder

		let planner = []
		for (var i = 0; i < numberOfObjects; i++)
			planner.push({
				id: calendar[i].id,
				title: calendar[i].title,
				date: calendar[i].date
			})

		planner.push.apply(planner, plannerPlaceholder)

		return planner
	}


	/**
	 * Convert date or timestamp to ISO date string
	 * @param Date/Timestamp
	 * @param number
	 * @returns string
	 */
	public getIsoDate(date: Date, dayFromNow: number = 0) {

		// Check if (date = firebase timestamp), if so, convert it to a Date-format
		date instanceof Timestamp
			? date = new Date(date.toDate())
			: date = new Date(date)

		date.setDate(date.getDate() + dayFromNow)

		return new Date(date).toISOString().slice(0, 10)
	}


	/**
	 * Edit calendar planner to firebase
	 * @param object[]
	 * @returns Calendar
	 */
	private editCalendar(recipe: { value: any; id: string; date: string; title: string }) {
		const index = this.newCalendar['planner'].findIndex((x: { date: string }) => x.date === recipe.value.date)

		this.newCalendar['planner'][index].id = recipe.value.id
		this.newCalendar['planner'][index].title = recipe.value.title

		this.calendarService.update(this.newCalendar as Calendar)
	}



	public openCalendarDialog(recipe: any) {
		const dialogRef = this.dialog.open(CalendarUpdateDialogComponent, {
			data: {
				date: recipe.date,
				id: recipe.id,
				title: recipe.title
			}
		})
		dialogRef.afterClosed().subscribe(
			data => {
				if (!data)
					return console.log('Cancel')

				else if (!data.value.id || !data.value.date || !data.value.title)
					return console.log('Empty string')

				else {
					this.editCalendar(data)
					return
				}
			}
		)
	}



	public openIngredientDialog(recipe: any) {
		const dialogRef = this.dialog.open(CalendarAddIngredientsDialogComponent, {
			data: {
				id: recipe.id,
				title: recipe.title
			}
		})
		dialogRef.afterClosed().subscribe(
			data => {
				if (!data)
					return console.log('Cancel')

				else if (!data.value.id || !data.value.date || !data.value.title)
					return console.log('Empty string')

				else {
					this.editCalendar(data)
					return
				}
			}
		)
	}
}
