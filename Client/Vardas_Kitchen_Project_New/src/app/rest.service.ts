import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Router,NavigationStart,ActivatedRoute } from '@angular/router';

@Injectable()
export class RestService {

  constructor(private http:Http,private router: Router, private route:ActivatedRoute) {
    // this.http.get('/api/img/אורז עם עגבניות').map(res => res.json());

  }

  public getRecipe(){
    return this.http.get('/api'+ this.router.url).map(res => res.json());
  }

  public getSearchResults(){

    if(this.route.root.firstChild.snapshot.data.isGeneralSearch == false){
      // return this.http.get('/api'+ this.router.url).map(res => res.json());
      console.log("search - before sending to server: ", this.router.url);
    }
    else{
      console.log("ganeral search - before sending to server: ", this.router.url);
      // return this.http.get('/api/generalSearch'+ this.router.url).map(res => res.json());
    }
  }



}
