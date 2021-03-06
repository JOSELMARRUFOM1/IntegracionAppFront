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
  busqueda: any;
  middelwares: any = (datamiddleware as any).default;
  estados: any = (dataestados as any).default;
  dtOptions: DataTables.Settings = {};
 
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
    this.busqueda = false;
    this.getData();
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10
    // };

  }

  Buscar(): void {
    this.data = [];
    this.ngOnDestroy();
    this.getData();
  }
  editarFicha(ficha: any): void {
    this.router.navigate(['/home/' + ficha.id])

  }
  timeout(ms: number) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
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

  async  getData()  {
    this.busqueda = true;
    await this.timeout(2000);
    var that = this;
    this.RestService.post(environment.api + "/api/fichacabecera/BuscarConParametros/", this.formParametros.value)
      .subscribe((resultado: any) => {
        const returnjson: any[] = Array.of(resultado);
        this.data = resultado;
        this.data.forEach((item: any) => {
          item.estado = this.getEstado(item.estado);
        })
        
        that.busqueda = false;
      },
        error => {
          that.busqueda = false;
        })
        
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    // this.dtTrigger.unsubscribe();
  }

}
