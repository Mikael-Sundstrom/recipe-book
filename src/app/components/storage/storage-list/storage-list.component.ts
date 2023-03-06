import { Component } from '@angular/core'
import { Observable } from '@firebase/util'
import { FileService } from 'src/app/services/file.service'

@Component({
	selector: 'app-storage-list',
	templateUrl: './storage-list.component.html',
	styleUrls: ['./storage-list.component.scss']
})

export class StorageListComponent {
	dataSource: Observable<any[]> | any

	constructor(public fileStorage: FileService) {
		this.dataSource = this.fileStorage.list()
	}

	eventHandler(file: Observable<any>) {
		console.table(file)
	}
}