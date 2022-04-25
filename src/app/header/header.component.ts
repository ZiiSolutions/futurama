import { Component, Input } from '@angular/core';

export interface Tab {
  name: string;
  link: string | string[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() tabs: Tab[];

  get titleAsArray() {
    return [...this.title];
  }
}
