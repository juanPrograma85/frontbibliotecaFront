import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from "./services/core.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';



//Modulo Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { AppHttpInterceptor } from './shared/AppHttpInterceptor';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LibrosComponent } from './pages/usuario/libros/libros.component';
import { PrestamosComponent } from './pages/usuario/prestamos/prestamos.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PagesComponent,
    FooterComponent,
    LibrosComponent,
    PrestamosComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
  ],

  providers: [
    CookieService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
