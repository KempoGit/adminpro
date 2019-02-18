import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this._modalUploadService.notificacion
    .subscribe( (resp: any) => {
      if ( resp.usuario._id === this._usuarioService.usuario._id) {
        this.usuario = this._usuarioService.usuario;
      }
    });
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino]);
  }

}
