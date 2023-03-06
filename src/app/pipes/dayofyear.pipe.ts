import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'dayofyear'
})
export class PipeDayOfYear implements PipeTransform {

	transform(date: Date): number {
		var j1 = new Date(date);
		j1.setMonth(0, 0);
		return Math.round((Number(date) - Number(j1)) / 8.64e7)
	}

}