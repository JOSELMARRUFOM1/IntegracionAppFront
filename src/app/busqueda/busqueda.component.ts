import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import * as datamiddleware from '../../assets/json/Middleware.json';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  middelwares: any = (datamiddleware as any).default;
  
  constructor() { }

  formParametros = new FormGroup({
    IdIdentificadorCI: new FormControl(''),
    IdDescripcion: new FormControl(''),
    Middelware: new FormControl(0),
  });
  ngOnInit(): void {
  }
  editar():void {
    console.log(this.formParametros.value);
  }

}
