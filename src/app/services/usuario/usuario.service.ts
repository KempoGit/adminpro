import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
    ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( token: string, usuario: Usuario) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token ) {
    let url = URL_SERVICIOS + 'login/google';

    return this.http.post( url, { token } )
    .pipe(map( (resp: any) => {
      this.guardarStorage( resp.token, resp.usuario);
      return true;
    }));
  }

  login( usuario: Usuario, recordar: Boolean) {
    if (recordar === true ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + 'login';
    return this.http.post(url, usuario)
    .pipe(map( (resp: any) => {
      this.guardarStorage( resp.token, resp.usuario);
      return true;
    }));
  }

  crearUsuario( usuario: Usuario) {
    let url = URL_SERVICIOS + 'usuario';
    return this.http.post( url, usuario )
    .pipe(map( (resp: any) => {
      Swal.fire('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    }));
  }

  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + 'usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
    .pipe(map( (resp: any) => {
      if ( usuario._id === this.usuario._id) {
        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage( this.token, usuarioDB);
      }
      Swal.fire('Usuario actializado', usuario.nombre, 'success');

      return true;
    }));
  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
    .then( (resp: any) => {
      this.usuario.img = resp.usuario.img;
      Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage( this.token, this.usuario);
    })
    .catch( resp => {
      console.log( resp );
    });
  }

  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIOS + 'usuario?desde=' + desde;

    return this.http.get( url );
  }

  buscarUsuario( termino: string ) {
    let url = URL_SERVICIOS + 'busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url );
  }

  borrarUsuario( id: string ) {
    let url = URL_SERVICIOS + 'usuario/' + id + '?token=' + this.token;
    return this.http.delete( url );
  }

}
