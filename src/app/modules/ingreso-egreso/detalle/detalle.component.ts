import { IngresoEgresoService } from 'src/app/core/services/ingreso-egreso.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/core/models/ingreso-egreso.model';
import { AppStateWithFinancy } from 'src/app/core/store/financy/financy.reducer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy{

  financyRegisters: IngresoEgreso[] = [];
  financySubscription: Subscription;
  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  constructor( private store: Store<AppStateWithFinancy>, private ieS: IngresoEgresoService) { }
  

  ngOnInit() {
    this.financySubscription = this.store.select('financy')
      .subscribe( ({ items }) => this.financyRegisters = items );
  }

  ngOnDestroy(): void {
    this.financySubscription?.unsubscribe();
  }

  updateItem( uid: string) : void {
    console.log(uid);
  }

  deleteItem( uid: string) : void {
    console.log(uid);
    this.ieS.deleteIngresoEgreso(uid)
        .then( () => {
          this.Toast.fire({
            icon: 'success',
            title: 'Registro Eliminado',
          })
        })
        .catch( err => {
          console.log('Failed to registered', err); 
          this.Toast.fire({
            icon: 'error',
            title: `Hubo un problema al crear el registro:  ${ err.message }`,
          });
        });
  }

}
