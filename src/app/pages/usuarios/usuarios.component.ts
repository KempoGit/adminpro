import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  desde = 0;

  totalRegistros = 0;
  cargando = true;

  subs: Subscription;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
    .subscribe( () => {
      this.cargarUsuarios();
    });
    this.subs = this._modalUploadService.notificacion
    .subscribe( (resp: any) => {
      if ( resp.usuario._id === this._usuarioService.usuario._id) {
        this._usuarioService.guardarStorage( this._usuarioService.token, resp.usuario, this._usuarioService.menu);
      }
    });
   }

  ngOnInit() { }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
    .subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde( valor: number) {
    let desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    this.cargando = true;
    if ( !termino ) {
      this.cargarUsuarios();
      return;
    }
    this._usuarioService.buscarUsuario( termino )
    .subscribe( (resp: any) => {
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario ) {
    if ( usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: 'Querés borrar este usuario?',
      text: 'No vas a poder recuperarlo',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario( usuario._id )
        .subscribe();
        Swal.fire({
          title: 'Borrado!',
          text: 'El usuario ya se borró.',
          type: 'success'
        }).then( () => this.cargarUsuarios() );
        }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario )
    .subscribe(
      resp => {
        Swal.fire('Usuario actualizado', usuario.nombre, 'success');
      },
      err => {
        Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
        console.log(err);
      }
    );
  }

}
