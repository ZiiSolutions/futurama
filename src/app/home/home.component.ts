import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { InfoDetail } from '../app-interfaces';
import { FuturamaService } from '../futurama.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  private readonly destroy$ = new Subject<boolean>();
  readonly data$: Observable<InfoDetail>;

  errorMessage: string;

  constructor(private futuramaService: FuturamaService) {
    this.data$ = this.futuramaService.fecthInfo().pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        this.errorMessage = err.message;
        return of();
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
