import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { InfoDetail } from '../app-interfaces';
import { FuturamaService } from '../futurama.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly data: Observable<InfoDetail>;
  errorMessage: string;

  constructor(private futuramaService: FuturamaService) {
    this.data = this.futuramaService.fecthInfo().pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return of();
      })
    );
  }
}
