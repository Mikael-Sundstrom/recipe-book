import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { FileService } from 'src/app/services/file.service'
import { ResizedEvent } from './../../../services/resized.directive'

@Component({
	selector: 'app-storage-upload',
	templateUrl: './storage-upload.component.html',
	styleUrls: ['./storage-upload.component.scss']
})

export class StorageUploadComponent implements OnInit {
	@ViewChild('dropzone') dropzone!: ElementRef
	@Output() uploadURL = new EventEmitter<string>()

	public isHovering: boolean = false
	public uploadProgress: number = 0
	private recipeImages: string = 'recipe_images'

	constructor(private fileService: FileService) { }

	ngOnInit(): void { }

	onResized(event: ResizedEvent) {
		this.dropzone.nativeElement.style.height = event.newRect.width + 'px'
	}

	toggleHover(event: boolean) {
		this.isHovering = event
	}

	chooseFile(event: any) {
		this.fileService.addFile(this.recipeImages, event.target.files[0], (progress: number) => {
			this.uploadProgress = progress
		}, (file_url: any) => {
			this.uploadURL.emit(file_url)
			console.log(file_url)
			this.dropzone.nativeElement.style = 'background-image: url("' + file_url + '"); background-position: center; background-size: cover;'
		})
	}

	onDrop(files: FileList) {
		this.fileService.addFile(this.recipeImages, files[0], (progress: number) => {
			this.uploadProgress = progress
		}, (file_url: any) => {
			this.uploadURL.emit(file_url)
			console.log(file_url)
			this.dropzone.nativeElement.style = 'background-image: url("' + file_url + '"); background-position: center; background-size: cover;'
		})
	}
}
