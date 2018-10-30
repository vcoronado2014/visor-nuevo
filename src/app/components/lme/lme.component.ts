import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
//servicios
import { ServicioVisorService } from '../../services/servicio-visor.service';

declare var JQuery :any;
declare var $:any;

@Component({
  selector: 'app-lme',
  templateUrl: './lme.component.html',
  styleUrls: ['./lme.component.scss']
})
export class LmeComponent implements OnInit {

  loading = false;
  lme = [
    {
      "nnumeroLicencia": "098765",
      "Folio": "874",
      "nombreDiagnostico": "Bronquitis",
      "diasDuracion": "11",
      "fInicio": "",
      "profesional": "Dra Elva Maurerira"
    },
    {
      "nnumeroLicencia": "067834",
      "Folio": "098",
      "nombreDiagnostico": "fractura tibia",
      "diasDuracion": "11",
      "fInicio": "",
      "profesional": "Dr Patricio Stuardo"
    },  
    {
      "nnumeroLicencia": "3457654",
      "Folio": "675",
      "nombreDiagnostico": "",
      "diasDuracion": "",
      "fInicio": "",
      "profesional": ""
    },  
    {
      "nnumeroLicencia": "123456",
      "Folio": "234",
      "nombreDiagnostico": "rinofaringitis",
      "diasDuracion": "7",
      "fInicio": "30132018",
      "profesional": ""
    },  
    {
      "nnumeroLicencia": "098654",
      "Folio": "736",
      "nombreDiagnostico": "Amigdalitis",
      "diasDuracion": "7",
      "fInicio": "",
      "profesional": "Dr Alejandro Rivas"
    },  
    {
      "nnumeroLicencia": "092348",
      "Folio": "645",
      "nombreDiagnostico": "Gastritis",
      "diasDuracion": "5",
      "fInicio": "",
      "profesional": "Dra Edna Contreras"
    },    
    {
      "nnumeroLicencia": "98725",
      "Folio": "654",
      "nombreDiagnostico": "Ulcera",
      "diasDuracion": "8",
      "fInicio": "",
      "profesional": "Dr Javiera Rojas"
    }  
]
  constructor( 
                private router: ActivatedRoute,
                public visor: ServicioVisorService) 
                { }

  ngOnInit() {
    this.tablaLme();
  }
 
  tablaLme(){
    $(function(){
      $('#tablaLme').DataTable({
        data: this.lme,
        columns: [
            { title: "Numero Licencia", className:'text-left '},
            { title: "Folio", className:'text-left ' },
            { title: "Nombre Diagnóstico", className:'text-left ' },
            { title: "Días Duración", className:'text-left ' },
            { title: "Fecha Inicio", className:'text-left'},
            { title: "Profesional", className:'text-left'}
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
