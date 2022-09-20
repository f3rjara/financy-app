import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';


const routesChild: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes
  }
];


@NgModule({

    imports: [
        RouterModule.forChild( routesChild )
    ],
    exports: [
        RouterModule
    ]

})
export class FinancyRoutingModule {}
