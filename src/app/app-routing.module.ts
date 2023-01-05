import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LibrosComponent } from './pages/usuario/libros/libros.component';
import { PrestamosComponent } from './pages/usuario/prestamos/prestamos.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'usuario',
        children: [
          {path: 'libros', component: LibrosComponent  },
          {path: 'prestamos', component: PrestamosComponent   },
        ]
      },
      {path: '', pathMatch: 'full', redirectTo: '/usuario/libros'},
      {path: '**', pathMatch: 'full', redirectTo: '/usuario/libros'},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
