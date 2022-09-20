import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.reducer';
import * as ui from 'src/app/core/store/ui/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public loadingApp: boolean = false;
  public loadingStore: Subscription;

  private firebaseErrors = {
    'auth/user-not-found': 'No existe un registro de usuario correspondiente al correo proporcionado.',
    'auth/wrong-password': 'La contraseña no es válida o el usuario no tiene una contraseña.',
    'auth/invalid-email': 'La dirección de correo electrónico está mal formateada.',
    'auth/email-already-in-use': 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/too-many-requests': 'Demasiados intentos fallidos. Por favor, inténtelo de nuevo más tarde.',
  };

  constructor( 
    private fb: FormBuilder,  
    private authApp: AuthService, 
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['f3rjara@gmail.com', [ Validators.required, Validators.email ]],
      password: ['123456', [ Validators.required, Validators.minLength(6) ]]
    });

    this.loadingStore = this.store.select('ui')
      .subscribe( ui => {
        this.loadingApp = ui.isLoading;
      });
  }

  ngOnDestroy(): void {
    this.loadingStore.unsubscribe();
  }

  loginUser() {
    if( this.loginForm.invalid ) { return; }

    this.store.dispatch( ui.isLoading() );

    const { email, password } = this.loginForm.value;
    this.authApp.loginUser( email, password )
      .then( user => {
        if( user ) {
          this.store.dispatch( ui.stopLoading() );
          Swal.close();
          this.router.navigate(['/']);
        }
      })
      .catch(( err ) => {
        const Toast = Swal.mixin({
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
        
        Toast.fire({
          icon: 'error',
          title: this.firebaseErrors[err.code],
        })
        setTimeout(() => {
          this.store.dispatch( ui.stopLoading() );
        }, 200);
      })
  }
}
