import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  
  constructor( 
    private fb: FormBuilder,
    private authApp: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formRegister = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3) ]],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]]
    });

    
  }

  createUser() {
    if( this.formRegister.invalid ) { return; }
    const { name, email, password } = this.formRegister.value;
    this.authApp.createUser( name, email, password )
    .then( user => { this.router.navigate(['/']); })
    .catch(() => {
      console.log('error');
    })
  }
}
