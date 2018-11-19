import { Component, OnInit, Input } from '@angular/core';
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
    let nuevoObj;
    
    let valor = parseFloat(obj.Valor);
    let vRef = obj.ValorReferencia.split("-");
    let vRefP1 = parseFloat(vRef[0]);
    let vRefP2 = parseFloat(vRef[1]);

    //console.log('Posicion uno ' + vRefP1 + 'Posicion dos ' + vRefP2);

    if (valor > vRefP1 && valor < vRefP2) {
      obj.ValorAnormal = false;
    } else{
      obj.ValorAnormal = true;
    }
    console.log(obj.ValorAnormal);
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
            this.table =$('#examTable').DataTable({
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
              "info": false,
              "searching": false,
              "lengthMenu":false, 
              "paging": false,
               select: true,
               "bAutoWidth": true,
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



      },
      err => {
        this.loading = false;
        console.error(err);
      },
      () => {
        console.log('get tablaExamenes');
      }
    );
  }

}