import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  // private respuesta:string=null;
  id = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap
      console.log(params.id);
       this.id=String(params.id);
    });
  
  }
}
