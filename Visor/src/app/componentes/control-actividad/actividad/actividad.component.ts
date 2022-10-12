import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad } from 'src/app/interfaces/actividades';
import { ActividadService } from 'src/app/services/i2t/actividad.service';
import { DialogService } from 'src/app/services/i2t/dialog.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalActividadComponent } from '../modal-actividad/modal-actividad.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Token } from '@angular/compiler';
import { LoginService } from 'src/app/services/i2t/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestService } from 'src/app/services/i2t/rest.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { ActividadSuite } from 'src/app/interfaces/actividadesSuite';
import { Data } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';


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
  displayedColumns:string[] = ['fecha','horas_ejecutadas'];
  displayedColumns2:string[] =  ['asunto_actividad','acciones'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'descripcion',...this.displayedColumns2];
  //columnsToDisplayWithExpand = [ ...this.displayedColumns,'children'];

  dataSource = new MatTableDataSource<any>();
  form! : FormGroup;
  actividad!: Actividad;
  index! : number | undefined;
  expandedElement!: Actividad | null;
  user! : Usuario;
  token!: String|null;
  actividades!: ActividadSuite[]|null;
  id!:string;
  subscription!:Subscription;

  panelOpenState = false;

  //inyecto el servicio 
  constructor(private _actividadService: ActividadService,
              private _loginService: LoginService,
              private http: HttpClient,
              private _restService: RestService,
              private _snackBar: MatSnackBar,
              private dialogService: DialogService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<ActividadComponent>,
              public dialogRefModal: MatDialogRef<ModalActividadComponent>,
              private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data:Actividad
               ) { }

  ngOnInit(): void {
    
    //this.cargarActividades();
    
    this.cargarActividadesSuite();
    
    
    this._actividadService.enviarIndexObservable.subscribe(response => {
      this.index = response;
    })
    this._actividadService.enviarIdActividadObservable.subscribe(response => {
      this.id = response;
    })
    console.log("muestra ID PPIO",this.id);
    console.log('todas las actividades',this._actividadService.listActividades)
    let usuario: Usuario ={
      usuario: 'admin',
      password: '1q2w'
    }
    this._loginService.obtenerToken(usuario).subscribe(res =>{
        if(res){
          console.log('res???',res);
          console.log('usuario???',usuario);
          console.log('token',localStorage.getItem('auth_token'));
          this.token = localStorage.getItem('auth_token');
          this.user = usuario;
        
        }
    });
    this.cargarActividadesSuite();
  } 
  

  /*toggleOn(horas: Number){
    console.log("asunto",horas);
    for(let row of this.listActividades){
      if (row.horas == horas){
        row.toggle = 1;
      }
    }
  }*/

  cargarActividades(){
    
    this.listActividades = this._actividadService.getActividad();
    this.dataSource = new MatTableDataSource(this.listActividades);
  }

  

  //Expand Panel
  expandedRows: { [key: number]: boolean } = {};
  expand(element: Actividad) {
    this.expandedRows[element.position] = !this.expandedRows[element.position]
  }


//ELIMINAR HARDCODE
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

  cargarActividadesSuite(){
    this.cd.detectChanges();
   
      this._actividadService.par_modoG().subscribe((response: any) =>{
      
        console.log("dataSource",this.dataSource);
        response.dataset.forEach((y: any) =>{
          if(y.descripcion == null || y.descripcion.length < 1 || y.descripcion === ""){
            y.descripcion = 'Esta actividad no tiene descripción';
          }   
        console.log(y.descripcion)
      });
        console.log("RESPONSE DATASET",response.dataset)
        
        this.dataSource = new MatTableDataSource(response.dataset)
        this.cd.detectChanges();
        console.log("DATA SOURCE",this.dataSource)
        
      });
    
    
   
  }


//ELIMINAR INTEGRACION
  /*onEliminarActividadSuite(index: number){
    console.log('posicion inicial',index);
      console.log('actividades',this._actividadService.listActividades)
    this.dialogService.openConfirmDialog('¿Usted está seguro de que desea eliminar esa actividad?' )
    .afterClosed().pipe(
      finalize(()=>{
        this.cargarActividadesSuite();
      })
    ).subscribe(res =>{
      if(res){
          console.log("id actividad a eliminar index",this.dataSource.data[index])
          console.log("id actividad a eliminar index id",this.dataSource.data[index].id_actividad)
         this._actividadService.deleteActividad(this.dataSource.data[index].id_actividad).subscribe((response:any)=>{
            console.log("DELETE EXITOSO", response);
          })
     
        this._snackBar.open('Actividad eliminada','',{
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    });
  
  }*/

  onEliminarActividadSuite(index: number){
    this.cargarActividadesSuite();
    this.dialogService.openConfirmDialog('¿Usted está seguro de que desea eliminar esa actividad?' )
    .afterClosed().subscribe(res =>{
      if(res){ 
        console.log(res);
         this._actividadService.deleteActividad(this.dataSource.data[index].id_actividad).subscribe((response:any)=>{
            console.log("DELETE EXITOSO", response);
            this.cargarActividadesSuite();
          })
          this._snackBar.open('Actividad eliminada','',{
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    });
    this.cd.detectChanges();
    this.cargarActividadesSuite();
  }

 cambioIndex(index: number){
  console.log('index del boton editar',index);
  this._actividadService.enviarIndex(index);
 }
 
  onEditarActividad(index: number){

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
      descripcion: elemento.descripcion,
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

  onEditarActividadSuite(index: number){

  
    let fAux = new String();
    fAux = this.dataSource.data[index].fecha.split(" ")[0];

    this._actividadService.enviarIdActividad(this.dataSource.data[index].id_actividad);

      
    let day:number = parseInt(fAux.split("-")[2]);
    let month:number= parseInt(fAux.split("-")[1]);
    let year: number = parseInt(fAux.split("-")[0]);

    const fechaA:string = year+'-'+month+'-'+day;
    const fecha =new Date(fechaA);
    console.log("prueba fecha",fecha) ;   
    
    
    
     this._actividadService.form.patchValue({
       fecha: fecha,
       horasEjecutadas: this.dataSource.data[index].horas_ejecutadas,
       descripcion: this.dataSource.data[index].descripcion,
       asunto: this.dataSource.data[index].asunto_actividad,
       tareaAsociada: this.dataSource.data[index].nombre_tarea
      })
      console.log("FORM 555",this.form)
    console.log('actividad final',this.dataSource.data[index])
    
    //this._actividadService.openModalActividad(8);
    const dialogRef = this.dialog.open(ModalActividadComponent,{});
    dialogRef.afterClosed().subscribe(res =>{
     if(res){
       console.log(res);
       this.cargarActividadesSuite();
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


  onAgregarActividad(){
      // Agregamos una nueva Actividad
      this._actividadService.form.reset();
      this._actividadService.form.patchValue({
        tareaAsociada: this.dataSource.data[0].nombre_tarea
      })
      const dialogRef = this.dialog.open(ModalActividadComponent,{});
  // this.dialog.open(ModalActividadComponent);
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        console.log(res);
        this.cargarActividadesSuite();
        this._snackBar.open('Actividad agregada','',{
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    });
  }

   

}




