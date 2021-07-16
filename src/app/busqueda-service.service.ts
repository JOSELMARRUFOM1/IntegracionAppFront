import { Injectable,Output ,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusquedaServiceService {
  @Output() disparadorDeBusqueda: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
