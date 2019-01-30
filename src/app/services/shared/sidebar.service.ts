import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-flash',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJs', url: '/rxjs' }
      ]
    }
  ];

  menu2: any = [
    {
      titulo: 'Panel secundario',
      icono: 'mdi mdi-emoticon-poop',
      submenu: [
        { titulo: 'Alguna', url: '/alguna' },
        { titulo: 'Pavada', url: '/pavada' }
      ]
    }
  ];

  constructor() { }
}
