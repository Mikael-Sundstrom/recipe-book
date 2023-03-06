import { Component } from "@angular/core"
import { Router, NavigationStart } from '@angular/router'
import { filter } from 'rxjs/operators'
import { Location } from '@angular/common'
import { Event as NavigationEvent } from "@angular/router"

interface TabLinks {
	label: String
	path: String
	icon: String
}

interface ConfigLinks {
	label: String
	path: String
	icon: String
	prefix: String
}

@Component({
	selector: "app-root",
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public title: String = 'Min receptbok'
	private history: Array<String> = []
	public isRoot: Boolean = true

	public configLinks: ConfigLinks[] = [
		{ label: 'Nytt recept', path: 'new-recipe', icon: 'writing.svg', prefix: 'fal' },
		{ label: 'Galleri', path: 'storage', icon: 'gallery.svg', prefix: 'fal' }/*,
		{ label: 'Privacy Policy', path: 'privacy-policy', icon: 'security', prefix: 'fal' },
		{ label: 'Terms of Service', path: 'terms-of-service', icon: 'policy', prefix: 'fal' } */
	]

	public tabLinks: TabLinks[] = [
		{
			label: 'Recept',
			path: 'recipes',
			icon: '/assets/images/icons/recipes.svg',
		}, {
			label: 'Kalender',
			path: 'calendar',
			icon: '/assets/images/icons/calendar.svg',
		}, {
			label: 'Inköp',
			path: 'shopping-list',
			icon: '/assets/images/icons/todo-list.svg',
		}
	]

	constructor(public location: Location, private router: Router) {

		// Handle route activity to add/remove styles and identify if user is on root directory
		this.router.events.pipe(filter((event: NavigationEvent) => {
			return (event instanceof NavigationStart)
		})).subscribe((event: NavigationStart | any) => {
			/**
			 * Create history array to identify if user could use goBack() function
			 *
			 * If user comes from another domain and go direcly to example.com/customer/id
			 * then that will be the root directory, and not example.com
			 *
			 * If the user navigates to the about route,
			 * it adds in an about string to the history array.
			 *
			 * Example
			 * @boolean isRoot	  true → false
			 * @array   history ['root','about']
			 *
			 * @AddFunctionality
			 * Make it possible to navigate backwards until it
			 * go back to the real root i.e. example.com
			 * @Bug
			 * It adds string to array even if the user faild to navigate on website with routerLink.
			 * It can happen if user tried to navitage to a route that doesn't exists on app.routing.ts
			 */
			if (event.id == 1) {

				this.isRoot = true
				this.history.push('root')

			} else {

				// If the user navigates backwards in the browser
				if (event.restoredState)
					if (this.history.length > 1)
						this.history.pop()
					else
						this.history = this.history

				// If the user navigates to a new route on the website
				else
					this.history.push(event.url)

				// If user is on root or not
				if (this.history.length == 1)
					this.isRoot = true
				else
					this.isRoot = false

			}
		})
	}

	// Call this method to see if the route should have a specific class on mat-sidenav-content
	getRouteWithTabs() {
		const routeWithTabs = ['/page-with-tabs', '/dashboard', '/error404']
		if (routeWithTabs.some(routeWithTabs => routeWithTabs == this.router.url))
			return "child-has-tabs"
		else
			return null
	}

}
