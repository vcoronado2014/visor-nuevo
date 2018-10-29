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

  public loading = true;
  public examenes = [];

  token = sessionStorage.getItem("PARAMETRO_FUC");
  idRyf = sessionStorage.getItem("ID_RYF");
  run = sessionStorage.getItem("IDENTIFICACION");

  constructor(    private router: ActivatedRoute,
                  public visor: ServicioVisorService
) { }

  ngOnInit() {
  
    this.obtenerExamPaciente(this.token,this.idRyf,this.run);
    this.tablaExam();

  }

  obtenerExamPaciente(tokenSession, idRyf, run){
    this.loading = true;
    this.visor.getSummary(tokenSession, idRyf, run).subscribe(
      dataSummary => {
        this.loading = false;
        //aca estoy trabajando con los datos VC
        var listaSummary = dataSummary.json();
        this.examenes = listaSummary.OrdenesExamenes;
        console.log(this.examenes);                
      },
      err => {
        this.loading = false;
        console.error(err);
      },
      () => {
        console.log('get examenes');
      }
    );
  }

  tablaExam(){
    $(function(){
      $('#examTable').DataTable({
        data: this.examenes,
        columns: [
            { title: "F.H. Toma de Muestra", className:'text-left '},
            { title: "Examen", className:'text-left ' },
            { title: "Determinante", className:'text-left ' },
            { title: "Unidad", className:'text-left ' },
            { title: "Valor", className:'text-left'},
            { title: "Valores de Referencia", className:'text-left'},
            { title: "Valor Anormal", className:'text-left'},
            { title: "Numero Orden", className:'text-left'}
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