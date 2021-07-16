import { Component, Input, OnInit } from '@angular/core';
import { BusquedaServiceService } from '../busqueda-service.service';
import { RestServiceService } from '../rest-service.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as datamiddleware from '../../assets/json/Middleware.json';
import * as dataestados from '../../assets/json/estados.json';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public secuencias: Array<any> = [];
  middelwares: any = (datamiddleware as any).default;
  estados: any = (dataestados as any).default;
  constructor(private busquedaService: BusquedaServiceService,
    private restserviceservice: RestServiceService,
    private router: Router) { }
  ngOnInit(): void {
    this.busquedaService.disparadorDeBusqueda.subscribe(data => {
      this.cargarData(data.id);
      this.secuencias = [];
    })
  }
  getName(id: number): string {
    var nombre = "";
    this.middelwares.forEach((item: any) => {
      if (item.id == id) {
        nombre = item.nombre;
      }
    });
    return nombre;
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

  cargarData(id: number): void {

    this.restserviceservice.get(environment.api + "/api/fichadetalle/BuscarporIdCabecera/" + id)
      .subscribe((data: any) => {
        const returnjson: any[] = Array.of(data);
        this.secuencias = returnjson[0];
        this.secuencias.forEach((item: any) => {
          item.middelware = this.getName(item.middelware);
          item.middelwareEstado = this.getEstado(item.middelwareEstado);
        })
      },
        error => {
          this.secuencias = [];
        })

  }
  editar(secuencia: any): void {
    console.log(secuencia);
    this.router.navigate(['/secuencia/' + secuencia.idFichaCabecera + '/' + secuencia.id])
  }
  ver(secuencia: any): void {
    console.log(secuencia);
  }
}



