import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital [] = [];

  medico: Medico = new Medico('', '', '', '', '');

  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params ['id'];
      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
    .subscribe( (resp: any) => this.hospitales = resp );
    this._modalUploadService.notificacion
    .subscribe( (resp) => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
    .subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital( this.medico.hospital );
    });
  }

  guardarMedico( f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
    .subscribe( medico => {
      if ( medico ) {
        if ( !this.medico._id ) {
          Swal.fire('Médico creado', 'No hubo problemas al crear el médico', 'success')
          .then( () => {
            this.medico._id = medico._id;
            this.router.navigate([ '/medico', medico._id ]);
          });
        } else {
          Swal.fire('Médico actualizado', 'No hubo problemas al actializar el médico', 'success')
          .then( () => {
            this.medico._id = medico._id;
            this.router.navigate([ '/medico', medico._id ]);
          });
        }
      } else {
        Swal.fire('Error', 'Hubo un problema al crear el médico', 'error');
      }
    });
  }

  cambioHospital( id: string ) {
    this._hospitalService.obtenerHospital( id )
    .subscribe( hospital => {
      if ( hospital ) {
        this.hospital = hospital;
      }
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }

}
