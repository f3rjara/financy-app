import { Subscription } from 'rxjs';
import { IngresoEgresoService } from './../../core/services/ingreso-egreso.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from 'src/app/core/models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/core/store/app.reducer';
import { Store } from '@ngrx/store';
import * as ui from './../../core/store/ui/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  formRegister: FormGroup;
  tipo        : string  = 'ingreso';
  registrando : boolean = false;
  registerSuscription: Subscription;

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

  constructor( 
    private fb: FormBuilder, 
    private ieS: IngresoEgresoService,
    private store: Store<AppState>
  ) { }
  
  ngOnInit() {
    this.formRegister = this.fb.group({
      description: [ '', Validators.required ],
      amount: [ '', [ Validators.required, Validators.min(0) ] ]
    });
    this.registerSuscription = this.store.select('ui')
      .subscribe( ui => { this.registrando = ui.isLoading; });
  }

  ngOnDestroy(): void {
    this.registerSuscription?.unsubscribe();
  }

  newRegister() {
    if( this.formRegister.invalid ) { return; }
    this.store.dispatch ( ui.isLoading() );

    const { description, amount } = this.formRegister.value;
    const registro = new IngresoEgreso( description, amount, this.tipo )
    this.ieS.createIngresoEgreso( registro )
            .then( (ref) => { 
              console.log('Registro creado', ref); 
              this.formRegister.reset();
              this.Toast.fire({
                icon: 'success',
                title: 'Registro creado',
              })
              this.store.dispatch ( ui.stopLoading() );
            })
            .catch((err) => { 
              console.log('Failed to registered', err); 
              this.Toast.fire({
                icon: 'error',
                title: `Hubo un problema al crear el registro:  ${ err.message }`,
              });
              this.store.dispatch ( ui.stopLoading() );
            });
  }

}
