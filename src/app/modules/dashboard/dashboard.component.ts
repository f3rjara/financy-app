import { IngresoEgreso } from 'src/app/core/models/ingreso-egreso.model';
import { AppState } from './../../core/store/app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/core/services/ingreso-egreso.service';
import * as financyAct from 'src/app/core/store/financy/financy.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  financySubscription: Subscription;

  constructor( 
    private store: Store<AppState>, 
    private ieS: IngresoEgresoService 
  ) { }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
        .pipe( filter( auth => auth.user != null ) )
        .subscribe( ({ user }) => {
          this.financySubscription = this.ieS.initIngresoEgresoListener( user.uid )
            .subscribe( ingresosEgresos => {
              this.store.dispatch( financyAct.setRegisters( { items: ingresosEgresos }) )
            });
        });
  }

  ngOnDestroy(): void {
    this.financySubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

}
