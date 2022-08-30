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
  subtituloProyecto: string ='';
  filtrosBusquedaProyecto: Object[] = []


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
    
    const dialogRef = this.dialog.open(DialogComponent,{width:'600px', data:{buscaProyectos: true, filtros: this.filtrosBusquedaProyecto}});
    dialogRef.afterClosed().pipe(
      finalize(() => {
        //this.proyectoSeleccionado();
      })
    )
    .subscribe(result => {
      
      //this.filtrosBusquedaProyecto = result;
      
      if(result != false){
        console.log(result)
        //Pregunto si utilizó filtros
        if(result.filtros.length == 0){
          
          //No utilizó filtros para encontrar el proyecto
          this.nombreProyecto = result.proyectoSeleccionado
          console.log(this.nombreProyecto)
        }
        else{
          if(result.filtros[0].nombreProyecto == ''){
            this.nombreProyecto = "Proyecto prueba";
          }
          else{
            this.nombreProyecto = result.filtros[0].nombreProyecto;
          }
        }
        
      }
      else{
        //this.nombreProyecto = 'cancelar';
        this.nombreProyecto = '';
      }
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

  proyectoSeleccionado(event: Event){
    console.log(this.nombreProyecto)
    if(this.nombreProyecto == ''){
      console.log(this.nombreProyecto)
      this.openSnackBar();
     
    }
    else{
      this.setSubtituloProyecto(event);
      if(this.nombreProyecto == 'cancelar'){
        this.nombreProyecto = '';
      }
      else{
      }
      
    } 
  }

  setSubtituloProyecto(event: Event){
    const vistaSeleccionada = (event.target as HTMLInputElement).id
    switch(vistaSeleccionada){
      case 'Analista Funcional':
        this.subtituloProyecto = ' Avance de Diseño funcional';
      break;
      case 'Analista Tecnico':
        this.subtituloProyecto = ' Avance de Diseño técnico';
      break;
      case 'Desarrollador':
        this.subtituloProyecto = ' Avance de Diseño funcional';
      break;
      case 'Tester':
        this.subtituloProyecto = ' Avance de Testing';
      break;
      case 'Project manager':
        this.subtituloProyecto = ' Avance del Proyecto';
      break;

      default:
        this.subtituloProyecto = '';
      break;
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
