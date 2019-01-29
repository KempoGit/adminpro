import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';

// ng2-charts

import { ChartsModule } from 'ng2-charts';

// Rutas

import { PAGES_ROUTES } from './pages.routes';

// Temporal

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        NopagefoundComponent,
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        NopagefoundComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }
