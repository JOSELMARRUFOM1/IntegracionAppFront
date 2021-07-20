import { estados } from './../estados';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { RestServiceService } from '../rest-service.service';
import * as datamiddleware from '../../assets/json/Middleware.json';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as dataestados from '../../assets/json/estados.json';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  middelwares: any = (datamiddleware as any).default;
  estados: any = (dataestados as any).default;

  constructor(
    private RestService: RestServiceService,
    private router: Router
  ) { }
  data: any;

  formParametros = new FormGroup({
    Id: new FormControl(''),
    Descripcion: new FormControl(''),
    Estado: new FormControl(),
  });
  ngOnInit(): void {

    this.getData();

  }

  Buscar(): void {
    this.getData();
  }
  editarFicha(ficha: any): void {
    this.router.navigate(['/home/' + ficha.id])

  }
  getEstado(id: number): string {
    var nombre = "";
    this.estados.forEach((item: any) => {
      if (item.id == id) {
        nombre = item.nombre;
      }
    });
    return nombre;
  }

  getData(): void {
    this.RestService.post(environment.api + "/api/fichacabecera/BuscarConParametros/", this.formParametros.value)
      .subscribe((resultado: any) => {
        const returnjson: any[] = Array.of(resultado);
        this.data = resultado;
        this.data.forEach((item: any) => {
          item.estado = this.getEstado(item.estado);
        })
      },
        error => {

        })
  }

}
