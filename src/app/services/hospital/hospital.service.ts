import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

totalHospitales = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) {}

  // Retona un observable con todos los hospitales
  cargarHospitales() {
    let url = URL_SERVICIOS + 'hospital';
    return this.http.get( url )
    .pipe( map( (resp: any) => {
      this.totalHospitales = resp.total;
      return resp.hospitales;
    } ) );
  }

  // Esta función recibe un ID de un hospital y retorna toda la información del mismo
  obtenerHospital( id: string ) {
    let url = URL_SERVICIOS + 'hospital/' + id;
    return this._usuarioService.http.get( url )
    .pipe( map( (resp: any) => resp.hospital ) );
  }

  // Recibe un ID de un hospital y lo borra
  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + 'hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url )
    .pipe( map( (resp: any) =>  resp) );
  }

  // Recibe el nombre del hospital y lo crea
  crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + 'hospital?token=' + this._usuarioService.token;
    return this.http.post( url, { nombre } )
    .pipe( map( (resp: any) => resp.hospital ) );
  }

  // Recibe el término de búsqueda y retorna todos los hospitales que coincidan con ese término de búsqueda
  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + 'busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
    .pipe( map( (resp: any) => resp.hospitales ) );
  }

  // Recibe un hospital y lo actualiza
  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + 'hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.put( url, hospital )
    .pipe( map( ( resp: any ) => resp.hospital ) );
  }

}
