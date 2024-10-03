import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'emazon-app';
  menuItems = [
    { url: '#home', title: 'Inicio' },
    { url: '#about', title: 'Acerca de' },
    { url: '#services', title: 'Servicios' },
    { url: '#contact', title: 'Contacto' }
  ];
}
