import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { map } from 'rxjs/internal/operators/map'

@Injectable({
	providedIn: 'root'
})
export class UtilService {

	constructor(private _snackBar: MatSnackBar, private http: HttpClient) { }

	snackbarMessage(message: string = 'Message', action: string = 'Avfärda', duration: number = 2000) {
		return this._snackBar.open(message, action, {
			duration: duration
		})
	}

	fetchJson(url: string) {
		this.http.get(url).pipe(map((res) => {
			return res
		}))
	}
}