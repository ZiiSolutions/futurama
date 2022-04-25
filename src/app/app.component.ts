import { Component } from '@angular/core';
import { Tab } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly tabs: Tab[] = [
    { name: 'Characters', link: '/characters' },
    { name: 'Quiz', link: '/quiz' },
  ];
}
