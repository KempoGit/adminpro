import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico [] = [];

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedico( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos( termino )
    .subscribe( (resp: any) => this.medicos = resp );
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos()
    .subscribe( ( resp: any ) => this.medicos = resp);
  }

  borrarMedico( medico: Medico ) {
    this._medicoService.borrarMedico( medico._id )
    .subscribe( ( resp: any ) => {
      if ( resp ) {
        Swal.fire('Usuario borrado', 'El usuario se borró correctamente', 'success')
        .then( () => this.cargarMedicos() );
      } else {
        Swal.fire('Error', 'El usuario no se pudo', 'error');
      }
    });
  }
}
