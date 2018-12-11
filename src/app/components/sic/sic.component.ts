import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
//servicios
import { ServicioVisorService } from '../../services/servicio-visor.service';

declare var JQuery :any;
declare var $:any;

@Component({
  selector: 'app-sic',
  templateUrl: './sic.component.html',
  styleUrls: ['./sic.component.scss']
})
export class SicComponent implements OnInit {
  sic = [
    {
      "estado": "atendido",
      "ges": "",
      "numSic": "3761820",
      "especialidad": "Broncopulmonar",
      "hipotesis": "asma",
      "fSolicitud": "13-08-2015"
    },
    {
      "estado": "atendido",
      "ges": "",
      "numSic": "2628690",
      "especialidad": "Broncopulmonar Adulto",
      "hipotesis": "Influenza debido a virus de la influenza",
      "fSolicitud": "24-07-2014"
    },
    {
      "estado": "atendido",
      "ges": "",
      "numSic": "2588076",
      "especialidad": "Broncopulmonar",
      "hipotesis": "Control de salud de rutina del niño",
      "fSolicitud": "09-07-2014"
    },
    {
      "estado": "atendido",
      "ges": "",
      "numSic": "2220773",
      "especialidad": "Broncopulmonar",
      "hipotesis": "Hipertensión esecial (primaria)",
      "fSolicitud": "13-08-2015"
    },
    {
      "estado": "atendido",
      "ges": "",
      "numSic": "2005786",
      "especialidad": "Cirugía Infantil",
      "hipotesis": "Rinofaringitis aguda (Resfriado común)",
      "fSolicitud": "13-08-2015"
    }            
]
  constructor(    private router: ActivatedRoute,
                  public visor: ServicioVisorService
             ) { }

  ngOnInit() {
    this.tablaSic();
  }

  
 tablaSic(){
  $(function(){
    $('#tablaSic').DataTable({
      data: this.sic,
      columns: [
          { title: "Estado", className:'text-left '},
          { title: "Ges", className:'text-left ' },
          { title: "Nº Sic", className:'text-left ' },
          { title: "Especialidad", className:'text-left ' },
          { title: "Hipótesis Diagnóstica", className:'text-left'},
          { title: "Fecha Solicitud", className:'text-left'}
      ],
      "info": false,
      "searching": false,
      "lengthMenu":false, 
      "paging": false,
        select: true,
      "language": {
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }   
      },      
    });
  });
 }


}
