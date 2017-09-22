import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Router,NavigationStart,ActivatedRoute } from '@angular/router';


@Injectable()
export class RestService {

  constructor(private http:Http,private router: Router, private route:ActivatedRoute) { }


  public getRecipe() {
    return this.http.get('/api'+ this.router.url).map(res => res.json());
  }

  public getSearchResults(isGeneralSearch) {
// this.route.root.firstChild.snapshot.data.isGeneralSearch == false
    if(isGeneralSearch == false) {
      console.log("activates regular search");
      console.log("search - before sending to server: ", this.router.url);
      return this.http.get('/api'+ this.router.url).map(res => res.json());
    }else{
      console.log("ganeral search - before sending to server:  ","/api/generalSearch",this.router.url);
      return this.http.get('/api/generalSearch'+ this.router.url).map(res => res.json());
    }
 }



}
