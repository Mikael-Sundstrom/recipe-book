export interface Recipe {
	concoction: Array<string>;
	cooking: number;
	created: Date;
	description: string;
	id: string;
	image: string;
	ingredients: Array<object>;
	portions: number;
	tags: Array<string>;
	title: string;
	updated: Date;
}
