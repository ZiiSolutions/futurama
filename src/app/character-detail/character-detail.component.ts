import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, mergeMap, Observable, of, Subject, takeUntil } from 'rxjs';
import { CharacterDetail, CharacterName } from '../app-interfaces';
import { FuturamaService } from '../futurama.service';
import {
  composeCharacterImageAltText,
  composeCharacterName,
} from '../util/character-util';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnDestroy {
  private readonly destroy$ = new Subject<boolean>();
  readonly data$: Observable<CharacterDetail | undefined>;

  errorMessage: string;

  constructor(
    private futuramaService: FuturamaService,
    private activatedRoute: ActivatedRoute
  ) {
    const params$ = this.activatedRoute.params;
    // Use character id provided by router since the use can navigate via URL
    this.data$ = params$.pipe(
      mergeMap((params) => {
        const id = params['id'];
        return this.futuramaService.fecthCharacter(id).pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            this.errorMessage = err.message;
            return of();
          })
        );
      })
    );
  }

  composeImageAltText(characterName: CharacterName): string {
    // To reduce code duplication logic has been extracted
    return composeCharacterImageAltText(characterName);
  }

  composeName(characterName: CharacterName): string {
    // To reduce code duplication logic has been extracted
    return composeCharacterName(characterName);
  }

  composeSayings(characterDetail: CharacterDetail): string[] {
    const { sayings } = characterDetail;
    // Never manipulate original & cover edge case
    //by removing empty strings (unlikely but why not be safe)
    // when relying on third party APIs you never know what can happen
    const copiedSaying = [...sayings].filter(
      (saying) => saying && saying.length
    );
    // Reduce number of saying to display
    if (copiedSaying.length > 5) {
      copiedSaying.length = 5;
    }
    return copiedSaying;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
