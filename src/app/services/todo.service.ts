import { Injectable } from '@angular/core'
import { Firestore, collectionData, docData, setDoc } from '@angular/fire/firestore'
import { CollectionReference, DocumentData, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore'
import { Todo } from 'src/app/interfaces/todo.model'

@Injectable({
	providedIn: 'root'
})

export class TodoService {
	private collection: string = 'shopping-list/'
	private todoCollection: CollectionReference<DocumentData>

	constructor(private firestore: Firestore) {
		this.todoCollection = collection(this.firestore, this.collection)
	}

	// Create a todo object
	create(todo: Todo) {
		const todoRef = doc(this.todoCollection)
		todo.id = todoRef.id

		return setDoc(todoRef, todo)
		/* return addDoc(this.todoCollection, todo) */
	}

	// Get all the todos in an array with objects
	list() {
		return collectionData(this.todoCollection/* , { idField: 'id', } */)
	}

	// Get a single todo object
	get(todo: Todo) {
		return docData(doc(this.firestore, this.collection + todo.id)/* , { idField: 'id' } */)
	}

	// Update a todo
	update(todo: Todo) {
		return updateDoc(doc(this.firestore, this.collection + todo.id), { ...todo })
	}

	// Delete a todo
	delete(todo: Todo) {
		return deleteDoc(doc(this.firestore, this.collection + todo.id))
	}
}
