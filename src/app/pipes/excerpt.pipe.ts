import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'excerpt'
})

export class PipeExcerpt implements PipeTransform {
	transform(text: string, length: number): string {
		if (text.length > length) {
			return text.substring(0, length) + '...'
		}
		return text
	}
}
