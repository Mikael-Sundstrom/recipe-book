import { Component, Inject, ViewChild } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { RecipeCreateConcoctionDialogComponent } from '../../recipe-create/recipe-create-dialog/recipe-create-concoction-dialog.component'

@Component({
	selector: 'app-recipe-edit-concoction',
	template: `
		<h2 mat-dialog-title>Redigera tillagning</h2>
		<mat-dialog-content class="edit-concoction-dialog">
			<table mat-table #concoctionTable [dataSource]="this.data.concoction" class="concoction" [cdkDropListData]="this.data.concoction" cdkDropList (cdkDropListDropped)="dropConcoction($event)">
				<ng-container matColumnDef="index">
					<th mat-header-cell *matHeaderCellDef> Postition </th>
					<td mat-cell *matCellDef="let index = index"> {{ index + 1 }} </td>
				</ng-container>
				<ng-container matColumnDef="concoction">
					<th mat-header-cell *matHeaderCellDef> Instruktion </th>
					<td mat-cell *matCellDef="let data"> {{ data }} </td>
				</ng-container>
				<ng-container matColumnDef="action">
					<th mat-header-cell *matHeaderCellDef> </th>
					<td mat-cell *matCellDef="let index = index">
						<button mat-icon-button (click)="deleteConcoction(index)">
							<mat-icon>delete</mat-icon>
						</button>
					</td>
				</ng-container>
				<tr mat-header-row *matHeaderRowDef="['index', 'concoction','action']"></tr>
				<tr mat-row cdkDrag [cdkDragData]="row" *matRowDef="let row; columns: ['index', 'concoction','action'];"></tr>
			</table>
			<br>
		</mat-dialog-content>
		<div class="spacer"></div>
		<mat-dialog-actions align="end">
			<button mat-raised-button (click)="openConcoctionDialog()" class="dialog-add">
				Lägg till <mat-icon>add</mat-icon>
			</button>
			<span style="flex: 1 1 auto;"></span>
			<button mat-button [mat-dialog-close]="false">Avbryt</button>
			<button mat-raised-button [mat-dialog-close]="this.data.concoction" type="button" color="accent">Spara</button>
		</mat-dialog-actions>
	`,
	styles: [`
		table {
			width: 100%;

			&.concoction {
				th,
				td {
					cursor: move;
					padding-top: 12px;
					padding-right: 12px;
					padding-bottom: 12px;
					width: inherit;

					&:first-child {
						width: 40px;
						padding-right: 12px;
					}

					&:last-child {
						width: 40px;
						padding-left: 12px;
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

		.preview-concoction {
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
			padding-top: 10px !important;
			padding-bottom: 11px !important;
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

export class RecipeEditConcoctionDialogComponent {
	@ViewChild('concoctionTable') concoctionTable: any

	constructor(@Inject(MAT_DIALOG_DATA) public data: { concoction: Array<object> }, public dialog: MatDialog) { }


	/**
	 * Add concoction
	 */
	public openConcoctionDialog() {
		const dialogRef = this.dialog.open(RecipeCreateConcoctionDialogComponent, {
			data: {
				description: ''
			}
		})
		dialogRef.afterClosed().subscribe(
			res => {
				if (!res)
					return console.log('Cancel')

				else if (!res.value.description)
					return console.log('Empty string')

				else {
					console.log(res.value.description)
					this.data.concoction.push(res.value.description)
					return this.concoctionTable.renderRows()
				}
			}
		)
	}


	/**
	 * Delete concoction
	 */
	public deleteConcoction(concoction: number) {
		this.data.concoction.splice(concoction, 1)
		return this.concoctionTable.renderRows()
	}


	/**
	 * Drag & drop concoction
	 */
	public dropConcoction(event: CdkDragDrop<object[]>) {
		const prevIndex = this.data.concoction.findIndex((d) => d === event.item.data)
		moveItemInArray(this.data.concoction, prevIndex, event.currentIndex)
		return this.concoctionTable.renderRows()
	}
}
