import { Injectable } from '@angular/core'
import { Firestore, collectionData, docData, setDoc } from '@angular/fire/firestore'
import { CollectionReference, DocumentData, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore'
import { Recipe } from '../interfaces/recipe.model'

@Injectable({
	providedIn: 'root'
})

export class RecipeService {
	private collection: string = 'recipes/'
	private recipeCollection: CollectionReference<DocumentData>

	constructor(private firestore: Firestore) {
		this.recipeCollection = collection(this.firestore, this.collection)
	}

	// Create a recipe object
	create(recipe: Recipe, callback: any) {
		const recipeRef = doc(this.recipeCollection)
		recipe.id = recipeRef.id

		setDoc(recipeRef, recipe)

		return callback(recipe.id)
	}

	// Get all the recipes in an array with objects
	list() {
		return collectionData(this.recipeCollection/* , { idField: 'id', } */)
	}

	// Get a single recipe object
	get(recipeId: Recipe) {
		return docData(doc(this.firestore, this.collection + recipeId)/* , { idField: 'id' } */)
	}

	// Update a recipe
	update(recipe: Recipe) {
		return updateDoc(doc(this.firestore, this.collection + recipe.id), { ...recipe })
	}

	// Delete a recipe
	delete(recipe: Recipe) {
		return deleteDoc(doc(this.firestore, this.collection + recipe.id))
	}
}
