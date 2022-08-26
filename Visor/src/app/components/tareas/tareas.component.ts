import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { finalize } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})

export class TareasComponent implements OnInit {

  nombreProyecto='';
  seleccionoProyecto = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  buscarProyecto(event: Event){
    event.preventDefault();
    //Para mostrar interfaz correpsondiente a editar una autoridad
    
    
    const dialogRef = this.dialog.open(DialogComponent,{width:'600px', data:{buscaProyectos: true}});
    dialogRef.afterClosed().pipe(
      finalize(() => {
          this.proyectoSeleccionado();
      })
    )
    .subscribe(result => {
      this.nombreProyecto = result;
      this.seleccionoProyecto = result;
    })
  }

  buscarTarea(){
    
    const dialogRef = this.dialog.open(DialogComponent,{width:'72%', data:{buscaTareas: true}});
    dialogRef.afterClosed().pipe(
      finalize(() => {
          console.log("Actualiza autoridades")
      })
    )
    .subscribe(result => {
      //filaEditar.name = result.name;
         
    })
  }

  proyectoSeleccionado():boolean{
    console.log(this.nombreProyecto)
    if(this.nombreProyecto == ''){
      this.openSnackBar();
     return true;
    }
    else{
      return false;
    } 
  }

  openSnackBar() {
    this._snackBar.open('Seleccione un proyecto y una vista', 'Cerrar', {
      //horizontalPosition: this.horizontalPosition,
      horizontalPosition: 'center',
      //verticalPosition: this.verticalPosition,
      verticalPosition: 'top'
    });
  }
}
