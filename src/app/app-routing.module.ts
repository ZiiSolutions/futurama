import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharactersComponent } from './characters/characters.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'characters',
    component: CharactersComponent,
  },
  {
    path: 'character/:id',
    component: CharacterDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
