import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( private authApp: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logoutUser() {
    this.authApp.logoutUser().then( () => {
      this.router.navigate(['/login']);
    });
  }
}
