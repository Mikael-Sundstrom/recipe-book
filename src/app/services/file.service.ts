import { Injectable } from '@angular/core'
import { getDownloadURL, ref, Storage, listAll, getMetadata, uploadBytesResumable, list } from '@angular/fire/storage'
import { from, startWith } from 'rxjs'
import { keepUnstableUntilFirst } from '@angular/fire'
import { traceUntilFirst } from '@angular/fire/performance'
import { Firestore, collectionData, docData, setDoc, CollectionReference, DocumentData, collection, deleteDoc, doc, updateDoc, query, where, orderBy } from '@angular/fire/firestore'
import { File } from 'src/app/interfaces/file.model'
import { UtilService } from './utils.service'


// Placeholder while loading images
const TRANSPARENT_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
// const TRANSPARENT_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

@Injectable({
	providedIn: 'root'
})

export class FileService {
	private collection: string = 'recipe_images/'
	private fileCollection: CollectionReference<DocumentData>

	public fileURL: any
	public fileMeta: any

	constructor(private storage: Storage, private firestore: Firestore, private utils: UtilService) {
		this.fileCollection = collection(this.firestore, this.collection)
	}

	// Upload file
	addFile(directory: string, file: any, cb_progress: any, cb_completed: any) {
		const fileName: string = new Date(Date.now()).toISOString().split('T')[0] + '_' + file.name
		const storageRef = ref(this.storage, directory + '/' + fileName)
		const uploadTask = uploadBytesResumable(storageRef, file/* , metadata */)
		uploadTask.on('state_changed', (snapshot) => {

			let progress: number = snapshot.bytesTransferred / snapshot.totalBytes * 100
			cb_progress(progress)
			console.log(progress + '%')

			if (progress == 100)
				this.utils.snackbarMessage('Uppladdningen lyckades')

		}, (error) => {
			switch (error.code) {
				case 'storage/unauthorized':
					this.utils.snackbarMessage('No permission')
					break
				case 'storage/canceled':
					this.utils.snackbarMessage('User cancel the upload')
					break
				case 'storage/unknown':
					this.utils.snackbarMessage('Unknown error occurred, inspect error.serverResponse')
					break
			}
		}, () => {
			getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
				cb_completed(downloadURL)
				const listRef: string = 'recipe_images'
				const itemRef: any = uploadTask.snapshot.ref.name

				this.getFileMeta(listRef, itemRef).subscribe((meta: any) => {
					const object = {
						id: '',
						folder: listRef,
						bucket: meta.bucket,
						contentDisposition: meta.contentDisposition,
						contentEncoding: meta.contentEncoding,
						contentType: meta.contentType,
						fullPath: meta.fullPath,
						generation: meta.generation,
						md5Hash: meta.md5Hash,
						metageneration: meta.metageneration,
						name: meta.name,
						size: meta.size,
						timeCreated: meta.timeCreated,
						type: meta.type,
						updated: meta.updated,
						path: downloadURL,
						extension: meta.name.split('.').pop()
					}
					this.create(object)
				})
			})
		})
	}

	// List all files within a directory
	async listAllFiles(listRef: string) {
		/**
			*	this.fileStorage.listAllFiles('recipe_images').then(async (res: any) => {
			*		const foo = await res
			*	})
		 */
		const referenceFolder = ref(this.storage, listRef)

		try {
			const res = await listAll(referenceFolder)
			let arrayOfFileObjects: object[] = []

			/* res.prefixes.forEach((folderRef) => {
				console.log(folderRef)
			}) */

			res.items.forEach(itemRef => {
				this.getFileMeta(listRef, itemRef.name).subscribe((meta: any) => {
					let returningObject = {
						folder: listRef,
						meta: meta,
						name: itemRef.name,
						path: this.getFile(listRef, itemRef.name),
						test: meta.timeCreated
					}
					return arrayOfFileObjects.push(returningObject)
				})
			})

			return arrayOfFileObjects

		} catch (error) {
			return console.log(error)

		}
	}

	// Get file
	getFile(folder: string, fileName: string) {
		/**
		 * @variable public imageURL: Observable<string>
		 * @constructor this.imageURL = fileService.getFile('recipe_images', 'untitled.png')
		 */
		const file = ref(this.storage, folder + '/' + fileName)

		this.fileURL = from(getDownloadURL(file)).pipe(
			keepUnstableUntilFirst,
			traceUntilFirst('storage'),
			startWith(TRANSPARENT_PNG)
		)

		return this.fileURL
	}

	// Get file metadata
	getFileMeta(folder: string, fileName: string) {
		const file = ref(this.storage, folder + '/' + fileName)

		return from(getMetadata(file))
	}


	// CRUD firestore
	// Create a file object
	create(file: File) {
		const fileRef = doc(this.fileCollection)
		file.id = fileRef.id

		// File doc
		// console.table(file)

		return setDoc(fileRef, file)
	}

	// Get all the files in an array with objects
	list() {
		const q = query(this.fileCollection, orderBy("timeCreated", "desc"))
		return collectionData(q)
	}

	// Get a single file object
	get(file: File) {
		return docData(doc(this.firestore, this.collection + file.id))
	}

	// Update a file
	update(file: File) {
		return updateDoc(doc(this.firestore, this.collection + file.id), { ...file })
	}

	// Delete a file
	delete(file: File) {
		return deleteDoc(doc(this.firestore, this.collection + file.id))
	}
}