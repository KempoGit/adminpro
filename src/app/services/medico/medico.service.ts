import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    let url = URL_SERVICIOS + 'medico';
    return this.http.get( url )
    .pipe(map( ( resp: any ) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    }));
  }

  cargarMedico( id: string ) {
    let url = URL_SERVICIOS + 'medico/' + id;
    return this.http.get( url )
    .pipe(map( (resp: any) => resp.medico ));
  }

  buscarMedicos( termino: string ) {
    let url = URL_SERVICIOS + 'busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
    .pipe(map( ( resp: any ) => resp.medicos ) );
  }

  borrarMedico( id: string ) {
    let url = URL_SERVICIOS + 'medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url );
  }

  guardarMedico( medico: Medico ) {
    if ( medico._id ) {
      // Actualizando
      let url = URL_SERVICIOS + 'medico/' + medico._id + '?token=' + this._usuarioService.token;
      return this.http.put( url, medico)
      .pipe(map( (resp: any ) => resp.medico ));
    } else {
      // Creando
      let url = URL_SERVICIOS + 'medico?token=' + this._usuarioService.token;
      return this.http.post( url, medico)
      .pipe(map( (resp: any ) => resp.medico ));
    }
  }

}
