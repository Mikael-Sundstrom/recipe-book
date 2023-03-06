import { Component, Inject, ViewChild } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { RecipeCreateIngredientDialogComponent } from '../../recipe-create/recipe-create-dialog/recipe-create-ingredient-dialog.component'

@Component({
	selector: 'app-recipe-edit-ingredients',
	template: `
		<h2 mat-dialog-title>Redigera ingredienser</h2>
		<mat-dialog-content class="edit-ingredients-dialog">
			<table mat-table #ingredientTable [dataSource]="this.data.ingredients" class="ingredients" [cdkDropListData]="this.data.ingredients" cdkDropList (cdkDropListDropped)="dropIngredient($event)">
				<ng-container matColumnDef="title">
					<th mat-header-cell *matHeaderCellDef> Vara </th>
					<td mat-cell *matCellDef="let data;">{{ data.title }}</td>
				</ng-container>
				<ng-container matColumnDef="qty">
					<th mat-header-cell *matHeaderCellDef> Antal </th>
					<td mat-cell *matCellDef="let data"> {{ data.qty }}</td>
				</ng-container>
				<ng-container matColumnDef="unit">
					<th mat-header-cell *matHeaderCellDef> Enhet </th>
					<td mat-cell *matCellDef="let data">{{ data.unit }}</td>
				</ng-container>
				<ng-container matColumnDef="action">
					<th mat-header-cell *matHeaderCellDef> </th>
					<td mat-cell *matCellDef="let index = index">
						<button mat-icon-button (click)="deleteIngredient(index)">
							<mat-icon>delete</mat-icon>
						</button>
					</td>
				</ng-container>
				<tr mat-header-row *matHeaderRowDef="['title', 'qty', 'unit', 'action']"></tr>
				<tr mat-row cdkDrag [cdkDragData]="row" *matRowDef="let row; columns: ['title', 'qty', 'unit', 'action']">
					<ng-template cdkDragPreview matchSize=true>
						<table class="preview-ingredient">
							<tr>
								<td>
									{{row.title}}
								</td>
								<td>
									{{row.qty}}
								</td>
								<td>
									{{row.unit}}
								</td>
								<td>
									<button mat-icon-button>
										<mat-icon>delete</mat-icon>
									</button>
								</td>
							</tr>
						</table>
					</ng-template>
				</tr>
			</table>
			<br>
		</mat-dialog-content>
		<div class="spacer"></div>
		<mat-dialog-actions align="end">
			<button mat-raised-button (click)="openIngredientDialog()" class="dialog-add">
				Lägg till <mat-icon>add</mat-icon>
			</button>
			<span style="flex: 1 1 auto;"></span>
			<button mat-button [mat-dialog-close]="false">Avbryt</button>
			<button mat-raised-button [mat-dialog-close]="this.data.ingredients" type="button" color="accent">Spara</button>
		</mat-dialog-actions>
	`,
	styles: [`
		table {
			width: 100%;

			&.ingredients {
				td {
					cursor: move;

					&:first-child {
						min-width: 50%;
					}

					&:last-child {
						width: 40px;
						color: rgb(255, 160, 160);
					}
				}
			}
		}
		/* Drag and drop */
		.cdk-drag-preview {
			box-sizing: border-box;
			height: auto !important;
			background: #fff;
			border-radius: 2px;
			vertical-align: middle;
			box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14),
				0 3px 14px 2px rgba(0, 0, 0, 0.12);
			td {
				padding-top: 12px;
				padding-right: 12px;
				padding-bottom: 12px;
				width: inherit;

				&:first-child {
					width: 70px;
					padding-right: 12px;
				}

				&:last-child {
					width: 40px;
					padding-left: 12px;
					color: rgb(255, 160, 160);
				}
			}
		}

		.preview-ingredient {
			td {
				font-size: 14px;
				padding: 0 12px;
				width: inherit;

				&:first-child {
					width: inherit;
					padding-left: 24px;
					padding-right: 12px;
				}

				&:last-child {
					width: 40px;
					padding-left: 12px;
					padding-right: 24px;
					color: rgb(255, 160, 160);
				}
			}
		}

		.cdk-drag-placeholder td {
			background: rgba(0, 0, 0, 0.04);
			color: transparent;
			border-bottom: dotted 2px #ccc;
			border-top: dotted 2px #ccc;
			opacity: 1;
			transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
		}

		.cdk-drag-animating {
			transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
		}

		.cdk-drop-list-dragging .mat-row:not(.cdk-drag-placeholder) {
			transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
		}
  `]
})

export class RecipeEditIngredientsDialogComponent {
	// Ingredient
	@ViewChild('ingredientTable') ingredientTable: any

	constructor(@Inject(MAT_DIALOG_DATA) public data: { ingredients: Array<object> }, public dialog: MatDialog) { }

	/**
	 * Add ingredient
	 */
	public openIngredientDialog() {
		const dialogRef = this.dialog.open(RecipeCreateIngredientDialogComponent, {
			data: {
				title: '',
				qty: '',
				unit: ''
			}
		})
		dialogRef.afterClosed().subscribe(
			res => {
				if (!res)
					return console.log('Cancel')

				else if (!res.value.title || !res.value.qty || !res.value.unit)
					return console.log('Empty string')

				else {
					this.data.ingredients.push(res.value)
					return this.ingredientTable.renderRows()
				}
			}
		)
	}


	/**
	 * Delete ingredient
	 */
	public deleteIngredient(ingredient: number) {
		this.data.ingredients.splice(ingredient, 1)
		return this.ingredientTable.renderRows()
	}


	/**
	 * Drag & drop ingredient
	 */
	public dropIngredient(event: CdkDragDrop<object[]>) {
		const prevIndex = this.data.ingredients.findIndex((d) => d === event.item.data)
		moveItemInArray(this.data.ingredients, prevIndex, event.currentIndex)
		return this.ingredientTable.renderRows()
	}
}
