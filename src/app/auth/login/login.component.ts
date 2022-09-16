import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  private firebaseErrors = {
    'auth/user-not-found': 'No existe un registro de usuario correspondiente al correo proporcionado.',
    'auth/wrong-password': 'La contraseña no es válida o el usuario no tiene una contraseña.',
    'auth/invalid-email': 'La dirección de correo electrónico está mal formateada.',
    'auth/email-already-in-use': 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.'
  };

  constructor( private fb: FormBuilder,  private authApp: AuthService, private router: Router ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['f3rjara@gmail.com', [ Validators.required, Validators.email ]],
      password: ['123456', [ Validators.required, Validators.minLength(6) ]]
    });
  }

  loginUser() {
    if( this.loginForm.invalid ) { return; }
    const { email, password } = this.loginForm.value;
    this.authApp.loginUser( email, password )
      .then( user => {
        console.log(user);
        if( user ) {
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
      })
  }
}
