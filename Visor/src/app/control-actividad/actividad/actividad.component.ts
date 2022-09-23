import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad } from 'src/app/interfaces/actividades';
import { ActividadService } from 'src/app/control-actividad/actividad.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalActividadComponent } from '../modal-actividad/modal-actividad.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkNoDataRow } from '@angular/cdk/table';
import { LoginService } from 'src/app/services/i2t/login.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { userInfo } from 'os';



@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  
})
export class ActividadComponent implements OnInit {

  listActividades: Actividad[]=[];
  
 
  //displayedColumns: string[] = ['fecha','horas','descripcion','asunto','acciones'];
  displayedColumns:string[] = ['fecha','horas'];
  displayedColumns2:string[] =  ['asunto','acciones'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'children',...this.displayedColumns2];
  //columnsToDisplayWithExpand = [ ...this.displayedColumns,'children'];

  dataSource!: MatTableDataSource<any>;
  form! : FormGroup;
  actividad!: Actividad;
  index! : number | undefined;
  expandedElement!: Actividad | null;
  user!: Usuario;
  

  panelOpenState = false;

  //inyecto el servicio 
  constructor(private _actividadService: ActividadService,
              private _snackBar: MatSnackBar,
              private dialogService: DialogService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<ActividadComponent>,
              public dialogRefModal: MatDialogRef<ModalActividadComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Actividad,
              private _loginService: LoginService,
               ) { }

  ngOnInit(): void {
    this._loginService.obtenerToken(this.user);
    this.cargarActividades();
    console.log('aqui va la carga de http',this.cargarTabla());
    this.cargarTabla();
    this._actividadService.enviarIndexObservable.subscribe(response => {
      this.index = response;
    })
    console.log('todas las actividades',this._actividadService.listActividades)
    this.getAllActividadesSuite();
  }

  toggleOn(horas: Number){
    console.log("asunto",horas);
    for(let row of this.listActividades){
      if (row.horas == horas){
        row.toggle = 1;
      }
    }
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
    console.log('posicion inicial',index);
    
      
      console.log('actividades',this._actividadService.listActividades)
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
  console.log('index del boton editar',index);
  this._actividadService.enviarIndex(index);
 }
 
  onEditarActividad(index: number){
     
    //this.cambioIndex(index);
    //this.index = index;
   /*this._actividadService.editarActividad(index);*/
   console.log("posicion incial",index);
    let aux = index;
  this._actividadService.enviarIndex(index);
   this._actividadService.listActividades.find( (elemento, aux) => {
    if(aux == index){
    console.log("actividad a editar",elemento);
    this._actividadService.form.patchValue({
    
      position: elemento.position,
      fecha: elemento.fecha,
      horasEjecutadas: elemento.horas,
      children: elemento.children,
      asunto: elemento.asunto,
      tareaAsociada: elemento.tareas
     })}
   })
  
   console.log('actividad final',this.actividad)
   
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
    
    this._actividadService.index = undefined;
  });
  
  this._actividadService.index = undefined;
  
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

  public cargarTabla(){
    this._actividadService.get('http://tstvar.i2tsa.com.ar:3001/api/proc/AbmActividades')
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }

   public getAllActividadesSuite(){
    this._actividadService.getAllActividadesSuite().subscribe(
      actividadesSuite => {
        console.log(actividadesSuite);
      }
    );
   }
}


