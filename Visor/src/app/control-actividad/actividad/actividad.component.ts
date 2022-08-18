import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad } from 'src/app/interfaces/actividades';
import { ActividadService } from 'src/app/control-actividad/actividad.service';
import { DialogService } from 'src/app/shared/dialog.service';



@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  listActividades: Actividad[]=[];

  displayedColumns: string[] = ['fecha', 'horas', 'descripcion', 'asunto', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  //inyecto el servicio 
  constructor(private _actividadService: ActividadService,
              private _snackBar: MatSnackBar,
              private dialogService: DialogService ) { }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(){
    this.listActividades = this._actividadService.getActividad();
    this.dataSource = new MatTableDataSource(this.listActividades);
  }

  //Expand Panel
  expandedRows: { [key: number]: boolean } = {};
  expand(element: Actividad) {
    this.expandedRows[element.descripcion] = !this.expandedRows[element.descripcion]
  }


  onEliminarActividad(index: number){
    this.dialogService.openConfirmDialog('¿Usted está seguro de que desea eliminar esa actividad?')
    .afterClosed().subscribe(res =>{
      if(res){
        this._actividadService.eliminarActividad(index);
        this.cargarActividades();
        this._snackBar.open('Actividad eliminada','',{
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    });
  }
}
