import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllKittiesComponent } from './components/all-kitties/all-kitties.component';
import { FavoritesKittiesComponent } from './components/favorites-kitties/favorites-kitties.component';

const routes: Routes = [
  {path: 'all-kitties', component: AllKittiesComponent},
  {path: 'favorites-kitties', component: FavoritesKittiesComponent},
  {path: '**', redirectTo: 'all-kitties'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
