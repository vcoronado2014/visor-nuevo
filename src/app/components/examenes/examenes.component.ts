import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
//servicios
import { ServicioVisorService } from '../../services/servicio-visor.service';

declare var JQuery :any;
declare var $:any;

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.scss']
})
export class ExamenesComponent implements OnInit {

  constructor(    private router: ActivatedRoute,
                  public visor: ServicioVisorService
) { }

  ngOnInit() {
  
    
  }

}
