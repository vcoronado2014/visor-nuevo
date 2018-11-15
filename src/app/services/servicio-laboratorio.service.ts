import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment'
import 'rxjs/add/operator/map';

@Injectable()
export class ServicioLaboratorioService {

  constructor( private http: Http ) { }


  postExamenes(run){

    let url = environment.API_ENDPOINT + 'Laboratorio';
    let dataGet = { Run: run };

    let data = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return data;
  }



}
