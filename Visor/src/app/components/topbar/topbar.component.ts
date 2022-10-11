import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/i2t/login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  nombreProyecto='';
  subtituloProyecto= '';
  nombreUsuario= '';

  constructor(private router : Router, private _loginService: LoginService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let user= localStorage.getItem('usuario');
    this.nombreUsuario= user == null ? '' : user;
  }

  configuracion(){
    this.router.navigate(['configuraciones'], {relativeTo: this.route });
  }

  logout(){
    this._loginService.logOut();
  }
}
