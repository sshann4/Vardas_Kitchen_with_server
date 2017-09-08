import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopPartComponent } from './top-part/top-part.component';
import { CenterPartComponent } from './home-page/center-part/center-part.component';
import { MostRecommendedComponent } from './home-page/center-part/most-recommended/most-recommended.component';
import { SidePartComponent } from './home-page/center-part/side-part/side-part.component';
import { SwitchRecipesComponent } from './home-page/center-part/switch-recipes/switch-recipes.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { SpecificRecipePageComponent } from './specific-recipe-page/specific-recipe-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RestService } from './rest.service';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'specificRecipe/:recName',
    component: SpecificRecipePageComponent,
    // data: { width: '20%' }
  },
  {
    path: 'search/:id',
    component: ResultPageComponent,
    data: { width: '20%' }
  },
  {
    path: '',
    component: HomePageComponent
    // redirectTo: '/home',
    // pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TopPartComponent,
    CenterPartComponent,
    MostRecommendedComponent,
    SidePartComponent,
    SwitchRecipesComponent,
    ResultPageComponent,
    SpecificRecipePageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false } // <-- debugging  purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
