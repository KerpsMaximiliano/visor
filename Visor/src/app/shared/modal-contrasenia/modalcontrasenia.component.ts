import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalcontrasenia',
  templateUrl: './modalcontrasenia.component.html',
  styleUrls: ['./modalcontrasenia.component.css']
})
export class ModalcontraseniaComponent implements OnInit {

  constructor(private _router: Router) {}

  ngOnInit(): void {
  }

  reDireccionar(){
    this._router.navigate(['login'])
  }

}
