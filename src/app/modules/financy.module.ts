import { RouterModule } from '@angular/router';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFinacyRegistersPipe } from '../core/pipes/order-finacy-registers.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { FinancyRoutingModule } from './financy-routing.module';
import { StoreModule } from '@ngrx/store';
import { financyReducer } from '../core/store/financy/financy.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    OrderFinacyRegistersPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature( 'financy', financyReducer ),
    FinancyRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule
  ]
})
export class FinancyModule { }
