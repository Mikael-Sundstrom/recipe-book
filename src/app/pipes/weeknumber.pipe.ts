import { Pipe, PipeTransform } from '@angular/core'
import { Timestamp } from '@angular/fire/firestore'

@Pipe({
	name: 'weeknumber'
})

export class PipeWeekNumber implements PipeTransform {
	transform(date: Timestamp) {
		let newDate: any

		// If format is timestamp ie firestore date, then convert it to date format.
		date instanceof Timestamp
			? newDate = new Date(date.toDate())
			: newDate = new Date(date)

		newDate.setUTCDate(newDate.getUTCDate() + 4 - (newDate.getUTCDay() || 7))

		return Math.ceil((((newDate - (new Date(Date.UTC(newDate.getUTCFullYear(), 0, 1)) as any)) / 86400000) + 1) / 7)
	}
}
