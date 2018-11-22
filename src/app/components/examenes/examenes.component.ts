import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import 'rxjs/add/operator/filter';
//servicios
import { ServicioVisorService } from '../../services/servicio-visor.service';
import { ServicioLaboratorioService } from "../../services/servicio-laboratorio.service";


declare var JQuery :any;
declare var $:any;

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.scss']
})
export class ExamenesComponent implements OnInit {

  public loading = true;
  public resultado = [];
  public dataExam = [];
  public now = moment().format('LLLL');
  table:any;  

  token = sessionStorage.getItem("PARAMETRO_FUC");
  idRyf = sessionStorage.getItem("ID_RYF");
  run = sessionStorage.getItem("IDENTIFICACION");
  arregloExamenes = [];

  constructor(    private router: ActivatedRoute,
                  public visor: ServicioVisorService,
                  public laboratorio : ServicioLaboratorioService
) {
  //this.obtenerExamenesPaciente('11311715K');
 }

  ngOnInit() {
 
       this.obtenerExamenesPaciente('35807322');

  }
  
  esAnormal(obj) {
    if (obj.ValorReferencia.length > 3) {
      let valor = parseFloat(obj.Valor);
      let vRef = obj.ValorReferencia.split("-");
      let vRefP1 = parseFloat(vRef[0]);
      let vRefP2 = parseFloat(vRef[1]);

      if (valor > vRefP1 && valor < vRefP2) {
        obj.ValorAnormal = false;
      } else {
        obj.ValorAnormal = true;
      }
    }
    return obj.ValorAnormal;
  }


  procesarRespuesta(arregloOriginal) {
    var arrRetorno = [];
    arregloOriginal.forEach(orden => {
      if (orden.Examenes) {
        orden.Examenes.forEach(examen => {
          if (examen.Resultados) {
            //si tiene resultados
            examen.Resultados.forEach(resultado => {
              var entidad = {
                FechaTomaMuestra: '',
                NombreExamen: '',
                NombreMuestra: '',
                Determinante: '',
                Unidad: '',
                Valor: '',
                ValorReferencia:'',
                ValorAnormal: false,
                NumeroOrden: 0,
                FechaSolictud: '',
                FechaResultados: ''
              };

              entidad.NumeroOrden = orden.NumeroOrden;
              entidad.FechaTomaMuestra = examen.FechaMuestra;
              entidad.FechaResultados = examen.FechaResultado;
              entidad.FechaSolictud = examen.FechaSolicitud;
              entidad.NombreExamen = examen.NombreExamen;
              entidad.Determinante = resultado.DescripcionResultado;
              entidad.Valor = resultado.Resultado;
              entidad.ValorReferencia = resultado.ValoresReferencia;
              entidad.Unidad = resultado.Um? resultado.Um:'-';
              entidad.ValorAnormal = this.esAnormal(entidad);

              
              arrRetorno.push(entidad);
              
            });
          }
          else {
            //no tiene resultados
            var entidad = {
              FechaTomaMuestra: '',
              NombreExamen: '',
              NombreMuestra: '',
              Determinante: '',
              Unidad: '',
              Valor: '',
              ValorReferencia: '',
              ValorAnormal: false,
              NumeroOrden: 0,
              FechaSolictud: '',
              FechaResultados: ''
            };
            entidad.NumeroOrden = orden.NumeroOrden;
            entidad.FechaTomaMuestra = examen.FechaMuestra;
            entidad.FechaResultados = examen.FechaResultado;
            entidad.FechaSolictud = examen.FechaSolictud;
            entidad.NombreExamen = examen.NombreExamen;
            arrRetorno.push(entidad);
          }
        });
      }
      else {
        var entidad = {
          FechaTomaMuestra: '',
          NombreExamen: '',
          NombreMuestra: '',
          Determinante: '',
          Unidad: '',
          Valor: '',
          ValorReferencia: 0,
          ValorAnormal: false,
          NumeroOrden: 0,
          FechaSolictud: '',
          FechaResultados: ''
        };
        entidad.NumeroOrden = orden.NumeroOrden;
        arrRetorno.push(entidad);
      }


    });

    return arrRetorno;
  }

  //ACA SE CONTRUYE LA TABLA Y EL LLAMDO DE LOS DATOS MP
  obtenerExamenesPaciente(run){
    this.resultado = [];
    this.loading = true;
    this.laboratorio.postExamenes(run).subscribe(
      data =>{      
        if (data){
          this.resultado = this.procesarRespuesta(data.json());
          console.log(this.resultado);
          $(function(){
            $.fn.dataTable.render.ellipsis = function (cutoff, wordbreak, escapeHtml) {
              var esc = function (t) {
                return t
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;');
              };
              return function (d, type, row) {
                // Order, search and type get the original data
                if (type !== 'display') {return d;}

                if (typeof d !== 'number' && typeof d !== 'string') { return d; }

                d = d.toString(); // cast numbers

                if (d.length < cutoff) { return d; }

                var shortened = d.substr(0, cutoff - 1);

                // Find the last white space character in the string
                if (wordbreak) { shortened = shortened.replace(/\s([^\s]*)$/, ''); }

                // Protect against uncontrolled HTML input
                if (escapeHtml) { shortened = esc(shortened); }

                return '<span class="ellipsis" title="' + esc(d) + '">' + shortened + '&#8230;</span>';
              };
            };            
            this.table =$('#examTable').DataTable({
              columnDefs: [{
                targets: 1,
                render: $.fn.dataTable.render.ellipsis(20)
              }],
              columns: [
                  { title: "F.H. Toma de Muestra", className:'text-left '},
                  { title: "Examen", className:'text-left adjust' },
                  { title: "Determinante", className:'text-left ' },
                  { title: "Unidad", className:'text-left ' },
                  { title: "Valor", className:'text-left'},
                  { title: "V. de Referencia", className:'text-left'},
                  { title: "V. Anormal", className:'text-left'},
                  { title: "Nº Orden", className:'text-left'},
                  { title: "F.H. Solicitud", className:'text-left'},
                  { title: "F.H Resultados", className:'text-left'}
              ],
              "language": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                  "sFirst": "Primero",
                  "sLast": "Último",
                  "sNext": "Siguiente",
                  "sPrevious": "Anterior"
                },
                "oAria": {
                  "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                  "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
              },              
              "paging": true,
              "info": false,
              "lengthChange": false, //este esconde el combo-box del menú
              select: true,
              "bAutoWidth": true,
              "scrollCollapse": false,
              "scrollX": false      
            });
          });
        }  



      },
      err => {
        this.loading = false;
        console.error(err);
      },
      () => {
        console.log('get tablaExamenes');
      }
    );
  };

  // showTooltip() {
  //   $('[data-toggle="tooltip"]').tooltip()
  // };
  // hideTooltip() {
  //   $('#nombreExamen').tooltip('hide')
  // };

}