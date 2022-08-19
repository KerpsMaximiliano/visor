import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})

export class TareasComponent implements OnInit {

  nombreProyecto='';


  constructor(public dialog: MatDialog) { }

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
          console.log("Actualiza autoridades")
      })
    )
    .subscribe(result => {
      //filaEditar.name = result.name;
      if(result !== false){
        console.log(result)
        console.log(result.name)
        if(result.name !== result.nombre || result.codigo !== result.aut_codigo){
          console.log("Llama servicio de editar")
          // this.loginService.editarAutoridad(filaEditar,this.token).subscribe((data)=>{
          //   console.log(data)
          // });
          // actualizar = true;
        }
        else{
          console.log("No cambió ningún valor")
        }
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
}
