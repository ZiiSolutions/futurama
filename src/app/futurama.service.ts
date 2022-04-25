import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { InfoDetail } from './app-interfaces';

@Injectable({
  providedIn: 'root',
})
export class FuturamaService {
  private readonly _errorInfo = new Subject<string>();

  constructor(
    private appConfig: AppConfigService,
    private httpClient: HttpClient
  ) {}

  fecthInfo(): Observable<InfoDetail> {
    return this.httpClient
      .get<InfoDetail[]>(`${this.appConfig.apiBaseUrl}/info`)
      .pipe(
        catchError((err) => throwError(() => this.retrieveErrorMessage(err))),
        map((res) => {
          // Display an error when server returns an empty array. This is an edge case, but
          // good to capture it.
          !res.length && throwError(() => 'Server returned an empty response');
          return res[0];
        })
      );
  }

  get errorMessage(): Observable<string> {
    return this._errorInfo.asObservable();
  }

  private retrieveErrorMessage(err: HttpErrorResponse): string {
    // Handle both client & server errors. Would be good to create an interface for server side error.
    // However, leaving it as is for simplicity.
    return err.error instanceof Error
      ? `Client side error occurred: ${err.error.message}`
      : this.getServerErrorMessage(err);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        // Currently the API doesn't require authentication.
        // But good idea to make the code future proof, since
        // third party APIs can change.
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
