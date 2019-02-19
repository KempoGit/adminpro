import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

// Service index
// ----------------------------
import {
  // GUARDS
  LoginGuardGuard,
  AdminGuard,
  VerificaTokenGuard,
  // MANTENIMIENTO
  UsuarioService,
  HospitalService,
  MedicoService,
  // FOTO
  SubirArchivoService,
  // OTROS
  SettingsService,
  SidebarService,
  SharedService
} from './service.index';
// ----------------------------

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // GUARDS
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    // MANTENIMIENTO
    UsuarioService,
    HospitalService,
    MedicoService,
    // FOTO
    SubirArchivoService,
    // OTROS
    ModalUploadService,
    SettingsService,
    SidebarService,
    SharedService
  ]
})

export class ServiceModule { }
