import { Component  , OnInit } from '@angular/core';
import * as  data  from  '../assets/json/estados.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  listaestados=[];
  title = 'Ficha';
  //selectedEstado: data = new data('','');


  ngOnInit(): void {
  }
  

  
}
