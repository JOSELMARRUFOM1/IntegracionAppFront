import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RestServiceService } from '../rest-service.service';
import { Router } from '@angular/router';
import * as datamiddleware from '../../assets/json/Middleware.json';
import * as dataestados from '../../assets/json/estados.json';
@Component({
  selector: 'app-detalle-form',
  templateUrl: './detalle-form.component.html',
  styleUrls: ['./detalle-form.component.css']
})
export class DetalleFormComponent implements OnInit {
  enviarServidor: any;
  id = '';
  idSecuencia = '';
  // variables generales 
  formDetalle = new FormControl('');   // variabla para las codicion de  I: insertar , U:Actualizar 
  modoEdicion: boolean = false;
  detalleform = new FormGroup({
    IdSecuencia: new FormControl(''),
    IdFichaCabecera: new FormControl(['', [Validators.required]]),
    Middelware: new FormControl('', [Validators.required]),
    MiddelwareEstado: new FormControl('', [Validators.required]),
    DescripcionSecuenciaOrigen: new FormControl('', [Validators.required]),
    DescripcionSecuenciaDestino: new FormControl('', [Validators.required]),
    InsAplicacionOrigen: new FormControl('', [Validators.required]),
    InsAplicacionDestino: new FormControl('', [Validators.required]),
    ConexionOrigen: new FormControl(''),
    ConexionDestino: new FormControl(''),
    UsuarioOrigen: new FormControl(''),
    UsuarioDestino: new FormControl(''),
    CertificadoOrigen: new FormControl(''),
    CertificadoDestino: new FormControl(''),
    jobOrigen: new FormControl(''),
    JobDestino: new FormControl(''),
    PathDocumentoFuncionalDestino: new FormControl(''),
    PathDocumentoFuncionalOrigen: new FormControl(''),
    CelulaResponsableOrigen: new FormControl(''),
    CelulaResponsableDestino: new FormControl(''),
    ConectorOrigen: new FormControl(''),
    ConectorDestino: new FormControl(''),
    SistemaLogicoOrigen: new FormControl(''),
    SistemaLogicoDestino: new FormControl(''),
    NumeroSecuencia: new FormControl(''),
    TipoConexionOrigen: new FormControl(''),
    TipoConexionDestino: new FormControl('')
  });
  middelwares: any = (datamiddleware as any).default;
  estados: any = (dataestados as any).default;
  constructor(private route: ActivatedRoute,
    private RestService: RestServiceService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.enviarServidor = false;
    this.route.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap
      this.id = String(params.id);
      if (params.id != undefined) {

        this.detalleform.value.IdFichaCabecera = params.id;

        this.detalleform.patchValue({
          IdFichaCabecera: params.id
        });

      }
      if (params.idSecuencia != undefined) {
        this.detalleform.value.idSecuencia = params.idSecuencia;
        this.detalleform.patchValue({
          IdSecuencia: params.idSecuencia
        });
        this.cargarData(params.idSecuencia);
        this.modoEdicion = true;
      }

    });
    if (this.id == undefined) {

      this.router.navigate(['/home'])
    }
  }
  cargarData(id: number): void {

    this.detalleform.controls['DescripcionSecuenciaDestino'].setValue("response.body.data.nombres");
    this.RestService.get(environment.api + "/api/fichadetalle/" + id)
      .subscribe((data: any) => {
        const returnjson: any[] = Array.of(data);
        this.detalleform.patchValue({
          // IdSecuencia: data.Id,
          // IdFichaCabecera: data.IdFichaCabecera,
          Middelware:data.middelware,
          MiddelwareEstado: data.middelwareEstado,
          DescripcionSecuenciaOrigen: data.descripcionSecuenciaOrigen,
          DescripcionSecuenciaDestino: data.descripcionSecuenciaDestino,
          InsAplicacionOrigen: data.insAplicacionOrigen,
          InsAplicacionDestino: data.insAplicacionDestino,
          ConexionOrigen: data.conexionOrigen,
          ConexionDestino: data.conexionDestino,
          UsuarioOrigen: data.usuarioOrigen,
          UsuarioDestino: data.usuarioDestino,
          CertificadoOrigen: data.certificadoOrigen,
          CertificadoDestino: data.certificadoDestino,
          jobOrigen: data.jobOrigen,
          JobDestino: data.jobDestino,
          PathDocumentoFuncionalDestino: data.pathDocumentoFuncionalDestino,
          PathDocumentoFuncionalOrigen: data.pathDocumentoFuncionalOrigen,
          CelulaResponsableOrigen: data.celulaResponsableOrigen,
          CelulaResponsableDestino: data.celulaResponsableDestino,
          ConectorOrigen: data.conectorOrigen,
          ConectorDestino: data.conectorDestino,
          SistemaLogicoOrigen: data.sistemaLogicoOrigen,
          SistemaLogicoDestino: data.sistemaLogicoDestino,
          NumeroSecuencia: data.numeroSecuencia,
          TipoConexionOrigen: data.tipoConexionOrigen,
          TipoConexionDestino: data.tipoConexionDestino
        });
      },
        error => {

        })

  }
  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // Eventos de la vista  
  async onSubmit() {
    var that = this;
    if (this.detalleform.valid) {
      this.enviarServidor = true;
      await this.timeout(1000);
      this.RestService.post(environment.api + "/api/fichadetalle", JSON.stringify(this.detalleform.value))
        .subscribe((res: any) => {
          alert('Registro exitoso');
          that.enviarServidor = false;
          that.modoEdicion = true;
          this.router.navigate(['/home/' + this.detalleform.value.IdFichaCabecera])
        }, err => {
          console.log(err);
          that.enviarServidor = false;
          that.modoEdicion = true;
        })
    }
    else {
      alert('Complete los campos');
    }
  }
  editar() {
    this.RestService.put(environment.api + "/api/fichadetalle/" + this.detalleform.value.IdSecuencia, JSON.stringify(this.detalleform.value))
      .subscribe((res: any) => {
        alert('Modificacion exitosa');
        this.router.navigate(['/home/' + this.detalleform.value.IdFichaCabecera])
      }, err => {
        console.log(err);
      })
  }
  regresar() {
    this.router.navigate(['/home/' + this.detalleform.value.IdFichaCabecera])
  }
}
