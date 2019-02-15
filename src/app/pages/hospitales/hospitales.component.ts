import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  cargando = false;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
    .subscribe( () => {
      this.cargarHospitales();
    });
  }

  crearHospital() {
    Swal.fire({
      title: 'Nombre del hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Crear'
    })
    .then( ( resp ) => {
      if ( resp.value ) {
        this._hospitalService.crearHospital( resp.value )
        .subscribe( ( respuesta: any ) => {
          if ( respuesta ) {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'El hospital ha sido creado',
              showConfirmButton: false,
              timer: 1500
            });
            this.cargarHospitales();
          }
        });
      }
      if ( resp.value === '' ) {
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: 'El hospital debe tener nombre'
        });
      }
    });
  }

  buscarHospital( termino: string ) {
    if ( termino !== '' ) {
      this._hospitalService.buscarHospital( termino )
      .subscribe( (resp: any) => {
        if ( resp ) {
          this.hospitales = resp;
        }
      });
    } else {
      this.cargarHospitales();
    }
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }


  borrarHospital( hospital: Hospital ) {
    this._hospitalService.borrarHospital( hospital._id )
    .subscribe( ( resp: any ) => {
      if ( resp.ok ) {
        Swal.fire('Hospital borrado', 'Eliminado correctamente', 'success');
        this.cargarHospitales();
      } else {
        Swal.fire('Error', 'El hospital no se pudo borrar', 'error');
      }
    });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
    .subscribe( ( resp: any ) => this.hospitales = resp);
  }


  guardarHospital( hospital ) {
    this._hospitalService.actualizarHospital( hospital )
    .subscribe( ( resp: any ) => {
      if ( resp ) {
        Swal.fire('Hospital actualizado', 'Actualizado correctamente', 'success');
        this.cargarHospitales();
      } else {
        Swal.fire('Error', 'El hospital no se pudo actualizar', 'error');
      }
    });
  }

}
