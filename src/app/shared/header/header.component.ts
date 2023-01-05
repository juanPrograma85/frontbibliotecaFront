import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router
            , private cookieService: CookieService
            , private storageService: StorageService) {
  }
 
  ngOnInit(): void {
    
  }
  

}
