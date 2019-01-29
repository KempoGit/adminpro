import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {


  graficos: any = {
    'grafico1': {
      'labels': ['Manteca', 'Mermelada', 'Queso'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'El pan se come con'
    },
    'grafico2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Entrevistados'
    },
    'grafico3': {
      'labels': ['Obama', 'Alberto Einstein', 'Kempo'],
      'data':  [5, 15, 50],
      'type': 'doughnut',
      'leyenda': '¿Quien es más capo?'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [1, 99],
      'type': 'doughnut',
      'leyenda': '¿Kempo presidente?'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
