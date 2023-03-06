![GitHub package.json version](https://img.shields.io/github/package-json/v/Mikael-Sundstrom/recipe-book)
![GitHub language count](https://img.shields.io/github/languages/count/Mikael-Sundstrom/recipe-book)
![GitHub repo file count](https://img.shields.io/github/directory-file-count/Mikael-Sundstrom/recipe-book)
![GitHub repo size](https://img.shields.io/github/repo-size/Mikael-Sundstrom/recipe-book)
# RecipeBook
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.
* Firebase ``Firestore`` (database)
* Firebase ``Storage`` (file storeage)
* Firebase ``Hosting`` (website)
* Angular Material (theme)

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.


# Environment
`src/environments/environment.ts`  
`src/environments/environment.prod.ts`
```typescript
export const environment = {
	firebase: {
		projectId: 'my-personal-recipe-book',
		appId: '<app-id>',
		databaseURL: 'https://my-personal-recipe-book.firebaseio.com',
		storageBucket: 'my-personal-recipe-book.appspot.com',
		locationId: 'europe-west',
		apiKey: '<key>',
		authDomain: '<my-personal-recipe-book.firebaseapp.com>',
		messagingSenderId: '<sender-id>',
	},
	production: false // or true
};
```