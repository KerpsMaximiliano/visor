import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad } from 'src/app/interfaces/actividades';
import { ActividadService } from 'src/app/control-actividad/actividad.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalActividadComponent } from '../modal-actividad/modal-actividad.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  listActividades: Actividad[]=[];

  displayedColumns: string[] = ['fecha', 'horas', 'descripcion', 'asunto', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  form! : FormGroup;
  actividad!: Actividad;
  index! : number | undefined;

  panelOpenState = false;

  //inyecto el servicio 
  constructor(private _actividadService: ActividadService,
              private _snackBar: MatSnackBar,
              private dialogService: DialogService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<ActividadComponent>,
              public dialogRefModal: MatDialogRef<ModalActividadComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Actividad,
               ) { }

  ngOnInit(): void {
    this.cargarActividades();
    this._actividadService.enviarIndexObservable.subscribe(response => {
      this.index = response;
    })
    console.log('todas las actividades',this._actividadService.listActividades)
  }

  cargarActividades(){
    this.listActividades = this._actividadService.getActividad();
    this.dataSource = new MatTableDataSource(this.listActividades);
  }

  //Expand Panel
  expandedRows: { [key: number]: boolean } = {};
  expand(element: Actividad) {
    this.expandedRows[element.position] = !this.expandedRows[element.position]
  }


  onEliminarActividad(index: number){
    this.dialogService.openConfirmDialog('¿Usted está seguro de que desea eliminar esa actividad?' )
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

 cambioIndex(index: number){
  this._actividadService.enviarIndex(index);
 }
  
  onEditarActividad(index: number){
     
    
    this.cambioIndex(index);
    this.index = index;
   /*this._actividadService.editarActividad(index);*/
   this.actividad= this._actividadService.listActividades[index];

   console.log('actividad',this.actividad);

   this._actividadService.form.patchValue({
    fecha: this.actividad.fecha,
    horasEjecutadas: this.actividad.horas,
    descripcion: this.actividad.children,
    asunto: this.actividad.asunto,
    tareaAsociada: this.actividad.tareas
   })
   
   //this._actividadService.openModalActividad(8);
   const dialogRef = this.dialog.open(ModalActividadComponent,{});
   dialogRef.afterClosed().subscribe(res =>{
    if(res){
      console.log(res);
      this.cargarActividades();
      this._snackBar.open('Actividad actualizada','',{
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    }
  });
  }

  /*onAgregarActividad(){
    this._actividadService.openModalActividad(form: FormGroup);
    //this.modalActividad.agregarActividad();

  }*/

  //eseeeeee
  onAgregarActividad(){
      // Agregamos una nueva Actividad
      this._actividadService.form.reset();
      const dialogRef = this.dialog.open(ModalActividadComponent,{});
  // this.dialog.open(ModalActividadComponent);
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        console.log(res);
        this.cargarActividades();
        this._snackBar.open('Actividad agregada','',{
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    });
    
  }
}


