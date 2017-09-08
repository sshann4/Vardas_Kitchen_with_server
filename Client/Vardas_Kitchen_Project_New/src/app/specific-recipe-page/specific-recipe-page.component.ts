import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from './../rest.service';
import { HttpModule } from '@angular/http';
import { NgFor } from '@angular/common';

@Component({
  // selector: 'app-specific-recipe-page',
  templateUrl: './specific-recipe-page.component.html',
  styleUrls: ['./specific-recipe-page.component.css'],
  providers: [RestService]

})

export class SpecificRecipePageComponent implements OnInit {

  private recipe;
  private recipe_ingredients;
  private recipeSteps;

  constructor( private rest:RestService) { }

  ngOnInit() {
    this.rest.getRecipe().subscribe((resRecipe)=>{ //Returns a specific recipe. ****the https that gets back from rest.getRecipe() function is observable
      this.recipe = resRecipe;
      this.recipe_ingredients = resRecipe[0].ingredients;
      this.recipeSteps = resRecipe[0].steps;
    });
  }

}
