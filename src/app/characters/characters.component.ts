import { Component, OnDestroy } from '@angular/core';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { CharacterDetail, CharacterName } from '../app-interfaces';
import { FuturamaService } from '../futurama.service';
import {
  composeCharacterImageAltText,
  composeCharacterName,
} from '../util/character-util';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnDestroy {
  private readonly destroy$ = new Subject<boolean>();
  readonly data$: Observable<CharacterDetail[]>;

  errorMessage: string;

  constructor(private futuramaService: FuturamaService) {
    this.data$ = this.futuramaService.fecthCharacters().pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        this.errorMessage = err.message;
        return of();
      })
    );
  }

  composeLink(characterDetail: CharacterDetail) {
    return `/character/${characterDetail.id}`;
  }

  composeImageAltText(characterName: CharacterName) {
    // To reduce code duplication logic has been extracted
    return composeCharacterImageAltText(characterName);
  }

  composeName(characterName: CharacterName) {
    // To reduce code duplication logic has been extracted
    return composeCharacterName(characterName);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
