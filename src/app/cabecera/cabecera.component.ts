import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})

// "IdInterface":"1",
// 	"Estado":"Activo",
// 	"Entorno":"Produccion",
// 	"Descripcion":"Interfaz con lp0"
export class CabeceraComponent implements OnInit {
 public formCabecera = new FormGroup({ });
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formCabecera = this.formBuilder.group({
      idCI: ['',[Validators.required]],
      IdCiActivo:['',[Validators.required]],
      idDescripcion:['',[Validators.required]]
    })

  }

  
  send(): any {
    console.log(this.formCabecera.value);
  }
}
