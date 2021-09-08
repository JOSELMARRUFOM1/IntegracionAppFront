import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RestServiceService } from '../rest-service.service';
import { BusquedaServiceService } from '../busqueda-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as dataestados from '../../assets/json/estados.json';
import * as dataentornos from '../../assets/json/Entorno.json';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})

//  Ejemplo de merge
export class CabeceraComponent implements OnInit {
  enviarServidor: any;
  @Input() id: any;

  public formCabecera = new FormGroup({});
  modoEdicion: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private busqueda: BusquedaServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private RestService: RestServiceService) { }
  estados: any = (dataestados as any).default;
  entornos: any = (dataentornos as any).default;
  ngOnInit(): void {
    this.enviarServidor = false;
    // this.formCabecera();
    this.formCabecera = this.formBuilder.group({
      id: [],
      idInterface: ['INTZ_', [Validators.required]],
      idInterface1: [''],
      estado: ['', [Validators.required]],
      entorno: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]

    })
    this.formCabecera.value.id = 0;
    if (this.id != undefined && this.id > 0) {
      this.cargarData(this.id);
      this.modoEdicion = true;
    }


  }

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  cargarData(id: number): void {
    this.RestService.get(environment.api + "/api/fichacabecera/" + this.id)
      .subscribe((data: any) => {
        const returnjson: any[] = Array.of(data);
        this.formCabecera.patchValue({
          id: data.id,
          idInterface: data.idInterface,
          idInterface1: data.idInterface,
          estado: data.estado,
          entorno: data.entorno,
          descripcion: data.descripcion
        });

        this.busqueda.disparadorDeBusqueda.emit({
          id: data.id
        })

      },
        error => {

        })
  }
  async editar() {
    var that = this;
    if (this.formCabecera.valid) {
      this.enviarServidor = true;
      await this.timeout(1000);
      this.RestService.put(environment.api + "/api/fichacabecera/" + this.formCabecera.value.id, this.formCabecera.value)
        .subscribe((res: any) => {
          alert('Modificacion exitosa');
          that.enviarServidor = false;
          that.modoEdicion = true;
        },
          error => {
            alert('Modificacion exitosa');
            that.enviarServidor = false;
          })
    }

  }
  async send() {
    var that = this;
    if (this.formCabecera.valid) {
      this.enviarServidor = true;
      await this.timeout(1000);
      this.RestService.post(environment.api + "/api/fichacabecera", this.formCabecera.value)
        .subscribe((res: any) => {
          that.formCabecera.value.id = res.value;
          this.busqueda.disparadorDeBusqueda.emit({
            id: res.value
          })
          alert('Registro exitoso');
          that.enviarServidor = false;
          that.modoEdicion = true;
          this.router.navigate(['/home/' + this.formCabecera.value.id])


        },
          error => {

            that.enviarServidor = false;
          })
    }
    else {
      alert('Complete los campos');
    }
  }
  agregarDetalle(): any {
    if (this.formCabecera.value.id > 0) {
      this.router.navigate(['/secuencia/' + this.formCabecera.value.id])
    }
    return false;
  }
}
