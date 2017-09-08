import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Router,NavigationStart,ActivatedRoute } from '@angular/router';

@Injectable()
export class RestService {

  constructor(private http:Http,private router: Router, private route:ActivatedRoute) {}

  public getRecipe(){
    return this.http.get('/api'+ this.router.url).map(res => res.json());
  }

  public getSearchResults(){
    return this.http.get('/api'+ this.router.url).map(res => res.json());
  }

}
