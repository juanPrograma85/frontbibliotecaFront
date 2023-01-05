import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from './services/storage.service';

import { Router } from '@angular/router';
import { Constantes } from './shared/Constantes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  session: any;
  token: any;
  constructor(private cookieService: CookieService
    , private router: Router
    , private storageService: StorageService
    ) { }
    
  ngOnInit() {
    }

  cerrarSesion() {
    this.cookieService.deleteAll();
    this.storageService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
