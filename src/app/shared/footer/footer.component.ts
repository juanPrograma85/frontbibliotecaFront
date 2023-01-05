import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  anio: number;
  constructor() {
    this.anio = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}