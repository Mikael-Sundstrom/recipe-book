import { Injectable } from '@angular/core'
import { Firestore, collectionData, docData, setDoc, orderBy, query } from '@angular/fire/firestore'
import { CollectionReference, DocumentData, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore'
import { Calendar } from 'src/app/interfaces/calendar.model'

@Injectable({
	providedIn: 'root'
})

export class CalendarService {
	private collection: string = 'calendar/'
	private calendarCollection: CollectionReference<DocumentData>

	constructor(private firestore: Firestore) {
		this.calendarCollection = collection(this.firestore, this.collection)
	}

	// Create a todo object
	create(calendar: Calendar) {
		const calendarRef = doc(this.calendarCollection)
		calendar.id = calendarRef.id

		return setDoc(calendarRef, calendar)
	}

	// Get all the todos in an array with objects
	list() {
		return collectionData(this.calendarCollection/* , { idField: 'id', } */)
	}

	// Get a single todo object
	get(calendarId: string) {
		return docData(doc(this.firestore, this.collection + calendarId)/* , { idField: 'id' } */)
	}

	// Update a todo
	update(calendar: Calendar) {
		return updateDoc(doc(this.firestore, this.collection + calendar.id), { ...calendar })
	}

	// Delete a todo
	delete(calendar: Calendar) {
		return deleteDoc(doc(this.firestore, this.collection + calendar.id))
	}
}
